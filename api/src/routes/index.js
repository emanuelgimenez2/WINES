const { Router } = require('express');
const locationRoute =  require('./location')
const orderRoute =  require('./order')
const orderItemRoute =  require('./order_items')
const productRoute = require('./product')
const profileRoute =  require('./profile')
const productorRoute =  require('./productor')
const categoryRoute =  require('./category')
const userRoute = require('./user')
const filtersCategory = require('./filtersCategory');
const reviewsRoute = require('./review');
const shoppingCart = require('./shoppingCart');
const favorite = require('./favorite');
const payment = require('./payment');
const email = require('./send_mail')
const stock = require("./stock");
const admin = require("./admin");

const router = Router();

// Traigo Recetas
router.use('/products',productRoute);
// orders
router.use('/orders',orderRoute);
// orders   
router.use('/orderItem',orderItemRoute);
// location
router.use('/location',locationRoute);
// profile
router.use('/profile',profileRoute);
// productor
router.use('/productor',productorRoute);
// category
router.use('/category',categoryRoute);
// User
router.use('/user', userRoute);
// Filter Category
router.use('/filters', filtersCategory);
// Favorite
router.use('/favorite', favorite);
//review
router.use('/review', reviewsRoute);
// Shopping Cart
router.use('/shoppingCart', shoppingCart);
// Payment
router.use('/payment', payment);
// Send Email
router.use('/email', email)
// Stock
router.use('/stock', stock);
// Admin
router.use('/admin', admin);

module.exports = router;
