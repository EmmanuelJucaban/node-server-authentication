const passport = require('passport');
const User = require('../models/user');
const config = require('../config/config');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const LocalStrategy = require('passport-local');


const localOptions = {
  usernameField: 'email'
};

const localLogin = new LocalStrategy(localOptions, async (email, password, done) => {
  try {
    const user = await User.findOne({email});
    await user.comparePassword(password, user.password);
    return done(null, user);
  } catch(e) {
    done(null, false);
  }
});

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromHeader('authorization'),
  secretOrKey: config.secret
};

const jwtLogin = new JwtStrategy(jwtOptions, async (payload, done) => {
  try {
    const user = await User.findById(payload.id);
    if(!user) {
      return done(null, false);
    } else {
      return done(null, user);
    }
  } catch(e) {
    throw new Error(done(e, false));
  }
});

passport.use(jwtLogin);
passport.use(localLogin);
