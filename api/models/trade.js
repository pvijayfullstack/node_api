const mongoose = require('mongoose');

const tradeSchema = mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    type: String,
    user: Object,
    symbol: String,
    shares: Number,
    price: Number,
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Trade', tradeSchema);