const express = require('express');
const router = express.Router();
const {requireSignin, adminMiddleWare} = require('../middleware')
const { addProduct } = require('../controllers/product');
const multer = require('multer');
const shortid =require('shortid');
const path = require('path')


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(path.dirname(path.dirname(__dirname)), 'uploads/product'))
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, shortid.generate() + '-' + file.originalname)
    }
});

const upload = multer({storage})


router.post('/product/create', requireSignin, adminMiddleWare, upload.array('productPicture') ,addProduct);
// router.get('/product/getproduct');


module.exports = router