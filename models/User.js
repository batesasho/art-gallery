const mongoose = require('mongoose');
const bcrypt = require("bcrypt");
const {round} = require("../configuration/portConfiguration.js");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    address: {
        type: String
    }
});
userSchema.pre('save', function (next) {
    bcrypt.hash(this.password, round)
        .then(hashedPassword);
    this.password = hashedPassword;
    next();
});


const User = mongoose.model('User', userSchema);

module.exports = User;