const mongoose = require('mongoose');
const moment = require('moment-timezone');

const userSchema = mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    name: String,
    createdAt: {
        type: String,
        default: moment(new Date()).tz('Est').format('lll')
    }
});


module.exports = mongoose.model('User', userSchema );