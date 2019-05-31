var express = require('express');
var router = express.Router();
var passport = require('passport');
var Product = require('../models/product');
var Cart = require('../models/cart');

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
  if (!res.locals.login) {
    return res.redirect('/auth/google');
  }
  Product.find(function(err, docs) {
    var productRow = [];
    var rowSize = 3;
    for (var i = 0; i < docs.length; i += rowSize) {
      productRow.push(docs.slice(i, i + rowSize));
    }
    res.render('shop/shop', {title: 'Shop', products: productRow});
  });
});

router.get('/cart', function(req, res, next) {
  if (!req.session.cart) {
   res.render('cart/cart', {title: 'Cart', products: null});
  }
  var cart = new Cart(req.session.cart);
  res.render('cart/cart', {title: 'Cart', products: cart.cartArray(), total: cart.total });
});

router.get('/add-to-cart/:id', function(req, res, next) {
  var productId = req.params.id;
  var cart = new Cart(req.session.cart ? req.session.cart: {});

  Product.findById(productId, function(err, product) {
    if (err) {
      return res.redirect('/shop');
    }
    cart.add(product, product.id);
    req.session.cart = cart;
    console.log(req.session.cart);
    res.redirect('/shop');
  });
});

router.get('/removeitem/:id', function(req, res, next) {
  var productId = req.params.id;
  var cart = new Cart(req.session.cart ? req.session.cart: {});

  Product.findById(productId, function(err, product) {
    if (err) {
      return res.redirect('/cart');
    }
    cart.remove(product, product.id);
    req.session.cart = cart;
    console.log(req.session.cart);
    res.redirect('/cart');
  });
});


module.exports = router;
