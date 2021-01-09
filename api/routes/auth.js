const router = require('express').Router();
const passport = require('../services/auth/passport');
const db = require('../services/db');
const { v4: uuidv4 } = require('uuid');

router.post('/login', (req, res) =>
  passport.authenticate(
    'local',
    {
      usernameField: 'login',
      passwordField: 'password',
      session: false,
    },
    (err, user, trace) => {
      if (err || !user) {
        throw new Error(trace.message || 'Authentication error');
      }

      // Generate token for user:
      const newToken = uuidv4();

      res.send({ token: newToken });
    },
  )(req, res),
);

module.exports = router;
