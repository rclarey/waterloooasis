const { randomBytes, scrypt } = require('crypto');
const { Strategy } = require('passport');
const { Strategy: JwtStrategy } = require('passport-jwt');
const { sign } = require('jsonwebtoken');

const { query } = require('shared/util/db.js');
const { randomNames } = require('web_service/auth/randomname.js');

async function hashPassword(password, salt) {
  return scrypt(password, salt, 256, {
    cost: 32768,
    maxmem: 34000000, // maxmem > 128*8*cost as required
  }).toString('base64');
}

async function getUser(email) {
  const queryStr = 'SELECT email, username FROM user WHERE email = :email;';
  return query(queryStr, { email });
}

async function validateEmailAndPassword(email, password) {
  const queryStr = 'SELECT hash, salt FROM user WHERE email = :email;';
  const [hash, salt] = await query(queryStr, { email });
  if (!hash || !salt) {
    throw new Error('Hash or salt missing. Can\'t validate');
  }

  const hashPassword = await hashPassword(password, salt);
  return this.auth.password === hash;
}

async function generateUsername() {
  const queryStr = 'SELECT username FROM user WHERE username IN (:1, :2, :3, :4, :5);';

  // Keep retrying until we get a name that isn't used yet. see the comment above
  // the definition of randomNames() for why this likely succeeds first try
  while (true) {
    const names = randomNames();
    const usedNames = await query(queryStr, names);
    if (usedNames.length < 5) {
      const unusedNames = names.filter(name => usedNames.includes(name));
      return unusedNames[0];
    }
    // else retry
  }
}

async function createUser(email, password) {
  const queryStr = 'INSERT INTO user SET ?';
  const salt = randomBytes(32).toString('base64');

  const [hash, username] = await Promise.all([
    hashPassword(password, salt),
    generateUsername(),
  ]);

  await query(queryStr, {
    email,
    hash,
    salt,
    username
  });

  // return the result of getUser() so we're only passing along minimal info
  return getUser(email);
}


class SignInSignUpStrategy extends Strategy {
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

function extractJwtFromCookie(req) {
  return (req && req.cookies && req.cookies.jwt) || null;
}

const signupStrategy = new SignInSignUpStrategy(async (email, password, done) => {
  try {
    const user = await getUser(email);
    if (user) {
      throw new Error('That email is already taken.');
    }

    const newUser = await createUser(username, password);
    done(null, newUser);
  } catch (err) {
    done(err, null, err.message);
  }
});

const signinStrategy = new SignInSignUpStrategy(async (email, password, done) => {
  try {
    const valid = await validateEmailAndPassword(email, password);
    if (!valid) {
      throw new Error('Invalid Username or Password.');
    }

    const user = await getUser(email);
    done(null, user);
  } catch (err) {
    done(err, null, err.message);
  }
});

function authenticate(passport, redirect = false) {
  const config = { session: false };
  if (redirect) {
    config.failureRedirect = '/signin';
  }
  return passport.authenticate('jwt', config);
}

function handleSignInSignUp(strat, passport) {
  return (req, res, next) =>
    passport.authenticate(
      strat,
      { session: false },
      (err, user, reason) => {
        if (err) {
          res.status(400).send();
        } else if (!user) {
          res.status(400).json({ reason });
        } else {
          const secret = process.env.JWT_SECRET;
          const jwt = sign({ email: user.email }, secret, {
            algorithm: 'HS384',
            issuer: 'www.uwoasis.com',
          });

          res
            .cookie('jwt', jwt)
            .status(200)
            .send();
        }
      },
    )(req, res, next);
}

function handleSignInSignUp(_, res) {
  return function authResult(err, user, reason) {
    if (err) {
      res.status(400).send();
    } else if (!user) {
      res.status(400).json({ reason });
    } else {
      const secret = process.env.JWT_SECRET;
      const jwt = sign({ email: user.email }, secret, {
        algorithm: 'HS384',
        issuer: 'www.uwoasis.com',
      });

      res
        .cookie('jwt', jwt)
        .status(200)
        .send();
    }
  };
}


module.exports = function setupAuth(passport, db) {
  const authenticateStrategy = (config) =>
    new JwtStrategy(config, async ({ email }, done) => {
        try {
          const user = await getUser(email);
          done(null, user, 'Failed to authenticate.');
        } catch (err) {
          done(err, null);
        }
    });

  const jwtConfig = {
    algorithms: ['HS384'],
    issuer: 'www.uwoasis.com',
    jwtFromRequest: extractJwtFromCookie,
    secretOrKey: process.env.SUPER_SECRET_JWT_SECRET,
  };

  passport.use(authenticateStrategy(config));
  passport.use('signin', signinStrategy);
  passport.use('signup', signupStrategy);

  return {
    authenticate,
    signin: passport.authenticate('signin', { session: false }, handleSignInSignUp),
    signup: passport.authenticate('signup', { session: false }, handleSignInSignUp),
  };
}
