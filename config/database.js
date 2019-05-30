var mongoose = require('mongoose');

mongoose.connect('mongodb+srv://jxet:trenton@cluster0-aacrw.azure.mongodb.net/prdsilnd', 
{useNewUrlParser: true});

var db = mongoose.connection;

db.on('connected', function() {
    console.log(`Connected to MongoDB at ${db.host}:${db.port}`);
});