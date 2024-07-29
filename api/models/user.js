const mongoose = require ('mongoose')
const bcrypt = require('bcrypt-nodejs')

const validateEmail = (email) => {
    return (/^\S+@\S+\.\S+$/).test(email);
};

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        lowercase: true,
        required: 'Email address is required',
        validate: [validateEmail, 'Email Invalid']
    },
    password: {
        type: String,
        required: true
    },
    created_at: {
        type: Date,
        default: Date.now
    },
});

userSchema.pre('save', function(next) {
    const user = this;

    if (user.isNew || user.isModified('password')) {
        bcrypt.genSalt(10, (error, salt) => {
            if (error) return next(error);

            bcrypt.hash(user.password, salt, (error, hash) => {
                if (error) return next(error);

                user.password = hash;
                next();
            });
        });
    } else {
        next();
    }
});

userSchema.methods.comparePassword = function(candidatePassword, callback) {
    if (typeof callback !== 'function') {
        throw new TypeError('Callback must be a function');
    }

    bcrypt.compare(candidatePassword, this.password, (error, isMatch) => {
        if (error) return callback(error);
        callback(null, isMatch);
    });
};

module.exports = mongoose.model('User', userSchema);