const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    name: String,
    createdAt: {
        type: Date,
        default: new Date()
    }
});

module.exports = mongoose.model('User', userSchema );