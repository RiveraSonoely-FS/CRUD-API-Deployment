const passport = require('passport');
const { ExtractJwt, Strategy } = require('passport-jwt');

const User = require('../models/user');
const config = require('../config');

const jwtOptions = {
    secretOrKey: config.secret,
    jwtFromRequest: ExtractJwt.fromHeader('authorization')
};

const jwtStrategy = new Strategy(jwtOptions, async (payload, done) => {
    try {
        const user = await User.findById(payload.sub);
        if (user) {
            return done(null, user);
        } else {
            return done(null, false);
        }
    } catch (error) {
        return done(error, false);
    }
});

passport.use(jwtStrategy);
