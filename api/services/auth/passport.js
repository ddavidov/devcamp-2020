const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const User = require('../../models/user');

passport.use(
  new LocalStrategy(
    { usernameField: 'login', passwordField: 'password' },
    async function (username, password, done) {
      const user = await User.findByName(username);
      if (user) {
        // Check for passwords match:
        const pwdMatch = await bcrypt.compare(password, user.password);
        if (pwdMatch) {
          // Everything is ok, let's proceed:
          return done(null, user);
        }
      }
      // Authentication failure:
      return done(null, false, { message: 'Invalid user credentials' });
    },
  ),
);

module.exports = passport;
