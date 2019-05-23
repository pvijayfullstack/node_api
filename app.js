const express = require('express');
const app = express();

const tradeRoutes = require('./api/routes/trades'); 

app.use('/trades', tradeRoutes)
module.exports = app;

 