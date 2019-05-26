const express = require('express');
const mongoose = require('mongoose');
const Trade = require('../models/trade')
const User = require('../models/user')
const router = express.Router();

router.get('/', (req, res, next) => {
    const trade = Trade.find({});
    trade.exec( (error, trades) => {
        if(error) {
            return new Error("error:", error)
        }
        res.status(200).json({
            data: trades
        })
    })
});

// {
// 	"type": "Sell",
// 	"user": {
// 		"name": "vijay"
// 	},
// 	"symbol": "",
// 	"shares": 10,
// 	"price": 12	
// }
router.post('/', (req, res, next) => {
    const user = new User({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.user.name
    });
    const trade = new Trade({
        _id: new mongoose.Types.ObjectId(),
        type: req.body.type,
        user: user,
        symbol: req.body.symbol,
        price: req.body.price
    });
    trade.save().then( result => {
        console.log(result)
    })
    .catch( error => {
        console.log(error);
    })
    res.status(201).json({
        message: 'trade post',
        trade: trade
    })
});

router.get('/users/:userId', (req, res, next) => {
    const trade = Trade.findOne({'user._id': req.params.userId });
    trade.exec().then( trade => {
        res.status(200).json({
            data: trade
        })
    })
    .catch( err => {
        console.log("error:",err)
        res.status(401).json({
            data: "User was not found"
        })
    })
});

router.delete('/erase', (req, res, next) => {
    const query = { id: req.body.id}
    Trade.deleteOne(query, (err, trade) => {
        if(err){
            return new Error("Trade Id not found")
        }
        res.status(200).json({
            message: "Trade was successfully deleted!",
        })
    })
})

//?type={tradeType}&start={startDate}&end={endDate}
router.get('/stocks/:stockSymbol/trades', (req, res, next) => {
    
    res.status(200).json({
        message: 'stack list'
    });
});

// start={startDate}&end={endDate}
router.get('/stocks/:stockSymbol/price', (req, res, next) => {
    res.status(200).json({
        message: 'stack list'
    })
})

module.exports = router;