const passport = require('passport');
const { Strategy: JwtStrategy } = require('passport-jwt');
const { randomBytes, scrypt } = require('crypto');
const { sign } = require('jsonwebtoken');

const { query } = require('shared/util/db.js');
const randomNames = require('web_service/auth/randomname.js');
const sendVerificationEmail = require('web_service/auth/email.js');

const scryptOpts = {
  cost: 32768,
  maxmem: 34000000, // maxmem > 128*8*cost as required
};

async function computeHash(password, salt) {
  return new Promise((resolve, reject) => {
    scrypt(password, salt, 256, scryptOpts, (err, derivedKey) => {
      if (err) {
        reject(err);
      }

      resolve(derivedKey.toString('base64'));
    });
  });
}

async function getUser(email) {
  const queryStr = 'SELECT email, username FROM user WHERE email = ? LIMIT 1';
  const result = await query(queryStr, [email]);
  return result[0] || null;
}

async function validateEmailAndPassword(email, password) {
  const queryStr = 'SELECT hash, salt FROM user WHERE email = ?';
  const { hash, salt } = (await query(queryStr, [email]))[0] || {};
  if (!hash || !salt) {
    return false;
  }

  const hashedPassword = await computeHash(password, salt);
  return hash === hashedPassword;
}

async function generateUsername() {
  const queryStr =
    'SELECT username FROM user WHERE username IN (?, ?, ?, ?, ?)';

  // Keep retrying until we get a name that isn't used yet. see the comment above
  // the definition of randomNames() for why this likely succeeds first try.
  // As a safety measure only try 3 times, since needing more iterations than
  // that is almost certainly a bug.
  for (let i = 0; i < 3; i += 1) {
    const names = randomNames();
    const usedNames = await query(queryStr, names);
    if (usedNames.length < 5) {
      const unusedNames = names.filter(name => !usedNames.includes(name));
      return unusedNames[0];
    }
  }

  throw new Error('Failed to generate username.');
}

async function generateVerificationCode() {
  const queryStr = 'SELECT count(*) FROM verification WHERE code = ?';

  // Try a few times. Shouldn't take more than once
  for (let i = 0; i < 3; i += 1) {
    const code = randomBytes(33).toString('base64');
    const urlSafe = code.replace(/\+/g, '-').replace(/\//g, '_');
    const unused = (await query(queryStr, [urlSafe]))[0]['count(*)'] === 0;
    if (unused) {
      return urlSafe;
    }
  }

  throw new Error('Failed to generate verification code.');
}

const deleteVerifQuery = 'DELETE FROM verification WHERE email = ?';
const insertVerifQuery = 'INSERT INTO verification SET ?';
async function createAndSendVerification(email, password) {
  // if a user signs up multiple times just overwrite their unused verification row
  await query(deleteVerifQuery, [email]);

  const salt = randomBytes(32).toString('base64');
  const [hash, code] = await Promise.all([
    computeHash(password, salt),
    generateVerificationCode(),
  ]);

  const msIn10Min = 1000 * 60 * 10;
  const expires = new Date(Date.now() + msIn10Min);
  await query(insertVerifQuery, {
    email,
    hash,
    salt,
    code,
    expires,
  });
  await sendVerificationEmail(email, code);
}

async function resendVerification(req, res) {
  const selectQuery = 'SELECT hash, salt FROM verification WHERE email = ?';
  try {
    const email = req.body.email;
    if (!email) {
      throw new Error('No email provided');
    }

    // pull the hash and salt out of the old verification row so we don't have to store
    // and resend the plaintext password from the client
    const result = await query(selectQuery, [email]);
    if (result.length === 0) {
      throw { hardRetry: true };
    }

    await query(deleteVerifQuery, [email]);
    const code = await generateVerificationCode();
    const msIn10Min = 1000 * 60 * 10;
    const expires = new Date(Date.now() + msIn10Min);
    try {
      await query(insertVerifQuery, {
        email,
        code,
        expires,
        hash: result[0].hash,
        salt: result[0].salt,
      });
    } catch (e) {
      throw { hardRetry: true };
    }

    await sendVerificationEmail(email, code);
    res.json({ ok: true });
  } catch (error) {
    res.status(400);
    if (error.hardRetry) {
      res.json({ hardRetry: true });
    } else {
      res.json({ softRetry: true });
    }
  }
}

async function createUser(email, hash, salt) {
  const queryStr = 'INSERT INTO user SET ?';
  const username = await generateUsername();

  await query(queryStr, {
    email,
    hash,
    salt,
    username,
    log_rounds: 1, // TODO: what is this and when do we update it
  });

  // return the result of getUser() so we're only passing along minimal info
  return getUser(email);
}

async function doVerification(req, res) {
  const selectQuery =
    'SELECT email, hash, salt, expires FROM verification WHERE code = ?';
  const deleteQuery = 'DELETE FROM verification WHERE code = ?';
  const code = req.body.code;

  try {
    const result = await query(selectQuery, [code]);

    // Try to make sure verification is deleted before we proceed.
    // If it can't be deleted then don't continue
    for (let i = 0; i < 3; i += 1) {
      try {
        await query(deleteQuery, [code]);
        break;
      } catch (e) {
        if (i === 2) {
          throw new Error('Something went wrong. Reload the page to retry.');
        }
      }
    }

    const now = new Date(Date.now());
    if (result.length === 0 || result[0].expires < now) {
      throw new Error('This verification link has expired.');
    }

    const { email, hash, salt } = result[0];
    const user = await createUser(email, hash, salt);
    handleSignInOrVerify(res, null, user);
  } catch (error) {
    handleSignInOrVerify(res, null, null, error.message);
  }
}

function extractJwtFromCookie(req) {
  return (req && req.signedCookies && req.signedCookies.jwt) || null;
}

const badCharsPattern = /[^a-zA-Z0-9.@]/;
const wellFormedPattern = /[a-zA-Z0-9]+@edu\.uwaterloo\.ca/;
function validateEmail(email) {
  const badChars = badCharsPattern.exec(email) !== null;
  const formResult = wellFormedPattern.exec(email);
  const badForm = formResult === null || formResult[0].length !== email.length;
  if (badChars || badForm) {
    throw new Error('Bad email address.');
  }
}

function validatePassword(password) {
  if (password.length < 8) {
    throw new Error('Bad password.');
  }
}

class SignInSignUpStrategy extends passport.Strategy {
  constructor(verify) {
    super();
    this.name = 'signinsignout';
    this.verify = verify;
  }

  authenticate(req) {
    const email = req.body.email;
    const password = req.body.password;
    try {
      this.verify(email, password, (error, result, message) => {
        if (error) {
          this.fail(error.message);
        } else if (!result) {
          this.fail(message);
        } else {
          this.success(result);
        }
      });
    } catch (e) {
      this.error(e);
    }
  }
}

const signupStrategy = new SignInSignUpStrategy(
  async (email, password, done) => {
    try {
      validateEmail(email);
      validatePassword(password);

      const user = await getUser(email);
      if (user) {
        throw new Error('That email is already taken.');
      }

      await createAndSendVerification(email, password);
      done(null, true);
    } catch (err) {
      done(err, null, err.message);
    }
  },
);

const signinStrategy = new SignInSignUpStrategy(
  async (email, password, done) => {
    try {
      const valid = await validateEmailAndPassword(email, password);
      if (!valid) {
        throw new Error('Invalid Username or Password.');
      }

      const user = await getUser(email);
      done(null, user);
    } catch (err) {
      done(err, null);
    }
  },
);

function authenticationFork(success, failure) {
  return function forkMiddleware(req, res, next) {
    passport.authenticate('jwt', (err, user) => {
      if (err) {
        next(err);
      }

      if (!user) {
        failure(req, res, next);
      } else {
        success(req, res, next);
      }
    })(req, res, next);
  };
}

function handleSignUp(res, err, success, reason) {
  if (err) {
    res.status(500).send();
  } else if (!success) {
    res.status(400).json({ reason });
  } else {
    res.status(200).json({ ok: true });
  }
}

function handleSignInOrVerify(res, err, user, reason) {
  if (err) {
    res.status(500).send();
  } else if (!user) {
    res.status(400).json({ reason });
  } else {
    const secret = process.env.JWT_SECRET;
    const jwt = sign({ email: user.email }, secret, {
      algorithm: 'HS384',
      issuer: 'www.uwoasis.com',
    });

    const msInYear = 1000 * 60 * 60 * 24 * 365;
    res
      .cookie('jwt', jwt, { maxAge: msInYear, signed: true, httpOnly: true })
      .status(200)
      .json({ redirect: '/trending' });
  }
}

module.exports = function setupAuth(router) {
  const authenticateStrategy = config =>
    new JwtStrategy(config, async (info, done) => {
      try {
        const user = await getUser(info.email);
        done(null, user, 'Failed to authenticate.');
      } catch (err) {
        done(err, null);
      }
    });

  const jwtConfig = {
    algorithms: ['HS384'],
    issuer: 'www.uwoasis.com',
    jwtFromRequest: extractJwtFromCookie,
    secretOrKey: process.env.JWT_SECRET,
  };

  passport.use(authenticateStrategy(jwtConfig));
  passport.use('signin', signinStrategy);
  passport.use('signup', signupStrategy);

  router.post('/api/signin', (req, res, next) =>
    passport.authenticate(
      'signin',
      { session: false },
      handleSignInOrVerify.bind(null, res),
    )(req, res, next),
  );

  router.post('/api/signup', (req, res, next) =>
    passport.authenticate(
      'signup',
      { session: false },
      handleSignUp.bind(null, res),
    )(req, res, next),
  );

  router.post('/api/signout', (_, res) => {
    res
      .cookie('jwt', null, {
        expires: new Date(0),
        signed: true,
        httpOnly: true,
      })
      .status(200)
      .json({});
  });

  router.post('/api/verify', doVerification);

  router.post('/api/exists', async (req, res) => {
    const user = await getUser(req.body.email);
    res.json({ unused: !user });
  });

  router.post('/api/retryemail', resendVerification);

  return {
    authenticationFork,
    authenticate: passport.authenticate('jwt', {
      session: false,
    }),
    authenticateWithRedirect: passport.authenticate('jwt', {
      session: false,
      failureRedirect: '/signin',
    }),
  };
};
