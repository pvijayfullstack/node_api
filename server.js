
const http = require('http');
const app = require('./app');

const port = process.env.PORT || 3000;

const server = http.createServer(app);

server.listen(port);

// const MongoClient = require('mongodb').MongoClient;
// const url = "mongodb+srv://vijay:Vijasdf@cluster0-vhox9.mongodb.net/test?retryWrites=true";

