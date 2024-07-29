const passport = require('passport');
const { ExtractJwt, Strategy } = require('passport-jwt');
const LocalStrategy = require('passport-local');

const User = require('../models/user');
const config = require('../config');

const localOptions = {
    usernameField: 'email'
};

const localStrategy = new LocalStrategy(localOptions, async (email, password, done) => {
    try {
        const user = await User.findOne({ email });

        if (!user) {
            return done(null, false, { message: 'No user found with this email' });
        }

        const isMatch = await new Promise((resolve, reject) => {
            user.comparePassword(password, (error, isMatch) => {
                if (error) return reject(error);
                resolve(isMatch);
            });
        });

        if (!isMatch) {
            return done(null, false, { message: 'Password is incorrect' });
        }

        return done(null, user);
    } catch (error) {
        return done(error);
    }
});

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

passport.use(localStrategy);
passport.use(jwtStrategy);