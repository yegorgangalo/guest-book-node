const passport = require('passport');
const { Strategy, ExtractJwt } = require('passport-jwt');
const userModel = require('../routes/models/userModel');
require('dotenv').config();
const SECRET_KEY = process.env.JWT_SECRET;

const options = {
  secretOrKey: SECRET_KEY,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
};

passport.use(
  new Strategy(options, async (payload, done) => {
    try {
      const user = await userModel.findOne({ _id: payload._id });
      if (!user) {
        return done(new Error('User not found'));
      }
      return done(null, user.token ? user : false);
    } catch (err) {
      done(err);
    }
  }),
);
