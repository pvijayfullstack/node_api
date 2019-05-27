const mongoose = require('mongoose');
const moment = require('moment-timezone');

const tradeSchema = mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    type: String,
    user: Object,
    symbol: String,
    shares: Number,
    price: Number,  
    createdAt: {
        type: String,
        default: moment(new Date()).tz('Est').format('lll')
    },
    updatedAt: {
        type: String,
        default: moment(new Date()).tz('Est').format('lll')
    }
});

module.exports = mongoose.model('Trade', tradeSchema);