const router = require('express').Router();
const passport = require('../services/auth/passport');
const User = require('../models/user');
const { v4: uuidv4 } = require('uuid');

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

      // Generate token for user and actualize:
      user.token = uuidv4();
      await User.saveUser(user);

      res.send({ token: user.token });
    },
  )(req, res),
);

module.exports = router;
