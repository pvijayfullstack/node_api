const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    name: String,
    createdAt: {
        type: Date,
        default: new Date()
    }
});

const tradeSchema = mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    type: String,
    user: [ userSchema ],
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