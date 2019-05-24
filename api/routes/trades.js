const express = require('express');
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
    const trade = {
        type: req.body.type,
        user: {
            name: req.body.user.name
        },
        symbol: req.body.symbol,
        shares: req.body.shares,
        price: req.body.price
    }
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