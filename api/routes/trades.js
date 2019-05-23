const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'trade get'
    })
});

router.post('/', (req, res, next) => {
    res.status(201).json({
        message: 'trade post'
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