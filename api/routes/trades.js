const express = require('express');
const mongoose = require('mongoose');
const Trade = require('../models/trade')
const User = require('../models/user')
const router = express.Router();

router.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'trade get'
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

router.get('/users/:userID', (req, res, next) => {
    res.status(200).json({
        message: 'trades user'
    });
});

//type={tradeType}&start={startDate}&end={endDate}
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