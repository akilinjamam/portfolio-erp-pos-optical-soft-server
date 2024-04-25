require('dotenv').config();
const User = require('../modules/registration/registration.model')
const JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;
const passport = require("passport");
const opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.SECRET_KEY;

passport.use(
    new JwtStrategy(
        opts,
        (jwt_payload, done) => {

            User.findOne({ _id: jwt_payload.id }).then(user => {
                if (user) {
                    return done(null, user);
                } else {
                    return done(null, false);
                    // or you could create a new account
                }
            }).catch(err => {
                if (err) {
                    return done(err, false);
                }
            })
        }
    )
);
