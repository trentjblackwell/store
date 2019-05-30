var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
    item: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('product', schema);