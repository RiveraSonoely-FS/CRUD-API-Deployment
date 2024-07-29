const User = require('../models/user');
const jwt = require('jwt-simple');
const config = require('../config');

const tokenForUser = user => {
    const timestamp = new Date().getTime();
    return jwt.encode(
        { sub: user.id, iat: timestamp },
        config.secret
    );
};

exports.signin = (req, res, next) => {
    const user = req.user;
    res.json({ token: tokenForUser(user), user_id: user._id });
};

exports.signup = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        
        if (!email || !password) {
            return res.status(422).json({ error: "Please provide your email and password" });
        }

        const existingUser = await User.findOne({ email });
        
        if (existingUser) {
            return res.status(422).json({ error: "Email already in use" });
        }
        
        const user = new User({ email, password });
        await user.save();
        
        res.json({ user_id: user._id, token: tokenForUser(user) });
        
    } catch (error) {
        next(error);
    }
};
