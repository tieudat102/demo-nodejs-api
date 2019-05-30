var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
/**
 * User Schema
 */
var UserSchema = new Schema({
    username: {
        type: String,
        unique: true,
        lowercase: true,
        trim: true,
        required: true,
        minlength: 6,
        maxlength: 255
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
        maxlength: 255
    },
    full_name: {
        type: String,
        required: true,
        minlength: 6,
        maxlength: 255
    },
    created_at: {
        type: Date,
        default: Date.now
    }
});

UserSchema.methods.comparePassword = function (pw) {
    return bcrypt.compareSync(pw, this.password, (err) => {
        console.log(err);
    });
};

UserSchema.methods.getAccessToken = function () {
    return jwt.sign(this.toJsonData(), process.env.JWT_SECRET_KEY);
};

UserSchema.methods.toJsonData = function () {
    return {
        _id: this._id,
        username: this.username,
        full_name: this.full_name,
        created_at: this.created_at
    };
};

module.exports = mongoose.model('User', UserSchema);