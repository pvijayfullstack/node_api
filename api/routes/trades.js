const express = require('express');
const mongoose = require('mongoose');
const moment = require('moment');
const Joi = require('joi');
const sortBy = require('lodash').sortBy;

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

router.post('/', (req, res, next) => {
    const schema = Joi.object().keys({
        type: Joi.string().trim().required(),
        shares: Joi.number()
        .min(10)
        .max(30),
        price: Joi.number()
        .min(130.42)
        .max(195.65)
    })

    const {value , error} = Joi.validate(req.body, schema)
    if(error && error.details) {
        return res.status(401).json(error)
    }

    const user = new User({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.user.name
    });
    const trade = new Trade({
        _id: new mongoose.Types.ObjectId(),
        type: req.body.type,
        user: user,
        symbol: req.body.symbol,
        shares: req.body.shares,
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
    const userId = mongoose.Types.ObjectId(req.params.userId)
    const trade = Trade.findOne({'user._id': userId });
    trade.exec().then( trade => {
        res.status(200).json({
            data: trade
        })
    })
    .catch( err => {
        console.log("error:",err)
        res.status(404).json({
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
    const stockSymbol = req.params.stockSymbol;
    const tradeType = req.query.type;
    const startDate = req.query.start;
    const endDate = req.query.end;
    const query = { symbol: stockSymbol , type: tradeType, 
        createdAt: { $gte: moment(startDate).tz('Est').format('lll'), 
                     $lte: moment(endDate).tz('Est').format('lll') } }
    const trade = Trade.find(query)
    trade.exec()
    .then( doc => {
        if(doc.length > 0) {
            return res.status(200).json({
                data: doc
            })
        }
        return res.status(404).json({
            message: "No records found!"
        })
    })
    .catch( err => {
        new Error(err)
    })
    
});

// start={startDate}&end={endDate}
router.get('/stocks/:stockSymbol/price', (req, res, next) => {
    const stockSymbol = req.params.stockSymbol;
    const startDate = req.query.start;
    const endDate = req.query.end;
    const query = { symbol: stockSymbol, 
        createdAt: { $gte: moment(startDate).tz('Est').format('lll'), 
                     $lte: moment(endDate).tz('Est').format('lll') } }
    const trade = Trade.find(query)
    trade.exec()
    .then( doc => {
        let asc = sortBy(doc, 'price')
        if(doc.length > 0) {
            let lowestPrice = {
                symbol: asc[0].symbol,
                lowest: asc[0].price
            }
            let highest = asc[asc.length - 1];
            let highestPrice = {
                symbol: highest.symbol,
                highest: highest.price
            }
            return res.status(200).json({
                 data: { 
                     symbol: lowestPrice.symbol, 
                     lowest: lowestPrice.lowest,  
                     highest: highestPrice.highest 
                }
            })
        }

        res.status(404).json({
            message: 'There are no trades in the given date range'
        })
        
    })
    .catch(err => {
        new Error('error:', err)
    })
})

module.exports = router;