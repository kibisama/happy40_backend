const passport = require("passport");
const { Strategy: JwtStrategy, ExtractJwt } = require("passport-jwt");
const User = require("../models/user");

module.exports = () => {
  passport.use(
    new JwtStrategy(
      {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: process.env.JWT_SECRET,
      },
      async (jwt_payload, done) => {
        try {
          const user = await User.findOne({
            where: { email: jwt_payload.sub },
          });
          if (user) {
            return done(null, user);
          } else {
            return done(null, false);
          }
        } catch (e) {
          done(e, false);
        }
      }
    )
  );
};
