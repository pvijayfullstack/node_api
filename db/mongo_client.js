const MongoClient = require('mongodb').MongoClient;
const url = "mongodb+srv://vijay:Vijasdf@cluster0-vhox9.mongodb.net/test?retryWrites=true";

module.exportes = { 
    MongoClient: MongoClient, 
    url: url
}