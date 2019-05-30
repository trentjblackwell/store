var express = require('express');
var router = express.Router();
var Product = require('../models/product');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Prdsilnd' });
});

router.get('/shop', function(req, res, next) {
  Product.find(function(err, docs) {
    var productRow = [];
    var rowSize = 3;
    for (var i = 0; i < docs.length; i += rowSize) {
      productRow.push(docs.slice(i, i + rowSize));
    }
    res.render('shop/shop', {title: 'Shop', products: productRow});
  });
});


module.exports = router;
