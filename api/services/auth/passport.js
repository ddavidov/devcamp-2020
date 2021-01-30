const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const BearerStrategy = require('passport-http-bearer').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;
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
  new BearerStrategy(async function (token, done) {
    const user = await User.findByToken(token);
    return done(null, user);
  }),
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

module.exports = passport;
