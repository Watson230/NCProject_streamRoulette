if (!process.env.NODE_ENV) process.env.NODE_ENV = 'dev';

var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var app = express();
var config = require('./config');
var cors = require('cors')
var db = config.DB[process.env.NODE_ENV] || process.env.DB;
mongoose.Promise = Promise;


function mongooseConnect() {


    return mongoose.connect(db, { useMongoClient: true })
        .then(() => console.log('successfully connected to', db))
        .catch(err => console.log('connection failed', err));

}


app.use(cors())

app.use(bodyParser.json());

module.exports = { app, mongooseConnect };