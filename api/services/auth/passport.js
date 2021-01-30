const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;
const GoogleStrategy = require('./strategies/google');
const ExtractJwt = require('passport-jwt').ExtractJwt;
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

passport.use(
  new JwtStrategy(
    {
      //jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('JWT'),
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET,
      audience: process.env.HOST,
    },
    function (jwt_payload, done) {
      // @TODO: Sanitize payload:
      return done(null, jwt_payload);
    },
  ),
);

passport.use(
  new GoogleStrategy(function (profile, done) {
    // @TODO: Sanitize or transform user profile data
    return profile ? done(null, profile) : done('Google auth failed', null);
  }),
);

module.exports = passport;
