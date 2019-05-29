const mongoose = require('mongoose');
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

const port = process.env.PORT || 3000;
const host = 'localhost';

if(process.env.NODE_ENV === 'test') {
    mongoose.connect(
        "mongodb+srv://vijay:Vijasdf@cluster0-vhox9.mongodb.net/test?retryWrites=true",
        {useNewUrlParser: true}   
    ) 
    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error'));
    db.once('open', function() {
        console.log('We are connected to test database!');
    });
} else {
    mongoose.connect(
        "mongodb+srv://vijay:Vijasdf@cluster0-vhox9.mongodb.net/trade_services?retryWrites=true",
        {useNewUrlParser: true}   
    ) 
    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error'));
    db.once('open', function() {
        console.log('We are connected to dev database!');
    });
}
app.listen(port);
console.log('Listening on %s:%d...', host || '*', port);

module.exports = app;

 