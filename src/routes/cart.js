const express = require('express');
const { addItemToCart } = require('../controllers/cart');
const router = express.Router();
const { requireSignin, userMiddleWare } = require('../middleware');


router.post('/user/cart/add-to-cart', requireSignin, userMiddleWare, addItemToCart)


module.exports = router