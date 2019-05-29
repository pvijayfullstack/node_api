process.env.NODE_ENV = 'test';

var mongoose = require('mongoose');
var Mockgoose = require('mockgoose').Mockgoose;
var mockgoose = new Mockgoose(mongoose);

let chai = require('chai');
let chaiHttp = require('chai-http');
let should = chai.should();
let app = require('../app');

let Trade = require('../api/models/trade')

chai.use(chaiHttp);
describe('Trads', function () {

    before(function(done) {
        mockgoose.prepareStorage().then(function() {
            mongoose.connect('mongodb+srv://vijay:Vijasdf@cluster0-vhox9.mongodb.net/trade_services?retryWrites=true', { useNewUrlParser: true }, function(err) {
                done(err);
            });
        });
    });
    
      describe('Get all trades', () => {
        it ("should be status 200", (done)=> {
            chai.request(app)
                .get("/trades")
                .end((err, result)=>{
                    result.should.have.status(200);         
                    done()
            })
        }) 

        it ("should be status 404", (done)=> {
            chai.request(app)
                .get("/invalid")
                .end((err, result)=>{
                    result.should.have.status(404);         
                    done()
            })
        }) 
    });

    describe('POST trade', () => {
        it("/trade successfully post", (done) => {
            let trade = {
                type: 'sell',
                "user": {
                    name: 'some user name'
                },
                symbol: 'A',
                shares: 29,
                price:  134
            }
            chai.request(app)
            .post('/trades')
            .send(trade)
            .end( (err, res) => {
                res.should.have.status(201)
                done()
            })
        })
    })

    describe('POST, Invalid Price ', () => {
        it("Throw the 401 error if price value is invalid input, should be b/w 130.42 and 195.65", (done) => {
            let trade = {
                type: '',
                "user": {
                    name: 'some user name'
                },
                symbol: 'A',
                shares: 29,
                price:  134
            }
            chai.request(app)
            .post('/trades')
            .send(trade)
            .end( (err, res) => {
                res.should.have.status(401)
                done()
            })
        })
    })

    describe('POST, Invalid Share', () => {
        it("Throw 401 error if shares number is invalid input, should be more then 10 and less than 30", (done) => {
            let trade = {
                type: 'sell',
                "user": {
                    name: 'some user name'
                },
                symbol: 'A',
                shares: 33,
                price:  140
            }
            chai.request(app)
            .post('/trades')
            .send(trade)
            .end( (err, res) => {
                res.should.have.status(401)
                done()
            })
        })
    })

    describe('GET, find user', () => {
        it("should be search with user Id", (done) => {      
            Trade.findOne({}, {}, { sort: { 'createdAt' : -1 } }, function(err, trade) {
                console.log(trade.user._id );
                chai.request(app)
                .get(`/trades/users/${trade.user._id}`)
                .send(trade)
                .end( (err, res) => {
                    res.should.have.status(200)
                done()
                })
            });           
        })
    })
})

