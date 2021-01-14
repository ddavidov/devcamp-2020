const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const BearerStrategy = require('passport-http-bearer').Strategy;
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

passport.use(new BearerStrategy(
  async function(token, done) {
    const user = await User.findByToken(token);
    console.log('CURRENT USER:', user);
    return done(null, user);
  }
));

module.exports = passport;
