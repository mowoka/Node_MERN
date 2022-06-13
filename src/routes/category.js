const express = require('express');
const router = express.Router();
const { addCategory, getCategories } = require('../controllers/category');
const { requireSignin, adminMiddleWare } = require('../middleware');


router.post('/category/create',requireSignin, adminMiddleWare, addCategory);
router.get('/category/getCategory', getCategories);

module.exports = router;
