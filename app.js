const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');

const tradeRoutes = require('./api/routes/trades'); 

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/trades', tradeRoutes);

// error handler
app.use( (req, res, next) => {
    const error = new Error("Invalid Routes");
    error.status = 404;  
    next(error);
});

app.use( (error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    })
})

module.exports = app;

 