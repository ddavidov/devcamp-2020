const router = require('express').Router();
const passport = require('../services/auth/passport');
const jwt = require('jsonwebtoken');

router.post('/login', (req, res) =>
  passport.authenticate(
    'local',
    {
      usernameField: 'login',
      passwordField: 'password',
      session: false,
    },
    async (err, user, trace) => {
      if (err || !user) {
        throw new Error(trace.message || 'Authentication error');
      }

      const jwtToken = jwt.sign(user, process.env.JWT_SECRET, {
        expiresIn: '1d',
        audience: process.env.HOST,
      });

      res.send({ token: jwtToken });
    },
  )(req, res),
);

router.post('/social/google', (req, res) =>
  passport.authenticate(
    'google',
    {
      scope: ['email', 'profile'],
    },
    async (err, user, trace) => {
      if (err || !user) {
        throw new Error(trace.message || 'Authentication error');
      }
      console.log('GOOGLE USER:', user);
      // @TODO: Match Google to system user and get appropriate one from DB [...]
      const jwtToken = jwt.sign(user, process.env.JWT_SECRET, {
        expiresIn: '1d',
        audience: process.env.HOST,
      });

      res.send({ token: jwtToken });
    },
  )(req, res),
);

module.exports = router;
