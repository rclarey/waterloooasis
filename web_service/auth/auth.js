const passport = require('passport');
const { Strategy: JwtStrategy } = require('passport-jwt');
const { randomBytes, scrypt } = require('crypto');
const { sign } = require('jsonwebtoken');

const { query } = require('shared/util/db.js');
const randomNames = require('web_service/auth/randomname.js');

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
  const [{ hash, salt }] = await query(queryStr, [email]);
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

async function createUser(email, password) {
  const queryStr = 'INSERT INTO user SET ?';
  const salt = randomBytes(32).toString('base64');

  const [hash, username] = await Promise.all([
    computeHash(password, salt),
    generateUsername(),
  ]);

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
      this.verify(email, password, (error, user, message) => {
        if (error) {
          this.fail(error.message);
        } else if (!user) {
          this.fail(message);
        } else {
          this.success(user);
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

      const newUser = await createUser(email, password);
      done(null, newUser);
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

function handleSignInSignUp(res, err, user, reason) {
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
      handleSignInSignUp.bind(null, res),
    )(req, res, next),
  );

  router.post('/api/signup', (req, res, next) =>
    passport.authenticate(
      'signup',
      { session: false },
      handleSignInSignUp.bind(null, res),
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

  router.post('/api/exists', async (req, res) => {
    const user = await getUser(req.body.email);
    res.json({ unused: !user });
  });

  return {
    authenticationFork,
    authenticate: passport.authenticate('jwt', {
      session: false,
      failureRedirect: '/signin',
    }),
  };
};
