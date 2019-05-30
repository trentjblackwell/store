var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
    googleId: String,
    email: String
}, {
    timestamps: true
});

module.exports = mongoose.model('user', userSchema);