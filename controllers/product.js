var Product = require('../models/product');

var mongoose = require('mongoose');
mongoose.connect('mongodb+srv://jxet:trenton@cluster0-aacrw.azure.mongodb.net/prdsilnd', 
{useNewUrlParser: true});

var products = [
    new Product({
        item: 'Classic T-Shirt: Black',
        imageUrl: 'https://i.imgur.com/cICdDAm.jpg',
        price: 79
    }),
    new Product({
        item: 'Classic T-Shirt: Island Blue',
        imageUrl: 'https://i.imgur.com/jsjoXoj.jpg',
        price: 79
    }),
    new Product({
        item: 'Classic T-Shirt: Charcoal',
        imageUrl: 'https://i.imgur.com/OTa0C4Y.jpg',
        price: 79,
    }),
];
var done = 0;
for (var i= 0; i < products.length; i++) {
    products[i].save(function(err, result) {
        done++;
        if (done === products.length) {
            dbDisconnect();
        }
    });
}

function dbDisconnect() {
    mongoose.disconnect();
}
