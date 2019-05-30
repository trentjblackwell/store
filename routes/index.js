var express = require('express');
var router = express.Router();
var passport = require('passport');
var Product = require('../models/product');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Prdsilnd' });
});

//Google Login Route
router.get('/auth/google', passport.authenticate(
  'google',
  { scope: ['profile', 'email']}
));
//oauthcallbackroute
router.get('/oauthcallback', passport.authenticate(
  'google',
  {
    successRedirect: '/shop',
    failureRedirect: '/'
  }
));
//logout route
router.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/');
});
//shop/products route
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
