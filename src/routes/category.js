const express = require('express');
const router = express.Router();
const { addCategory, getCategories } = require('../controllers/category');
const { requireSignin, adminMiddleWare } = require('../middleware');
const multer = require('multer');
const shortid =require('shortid');
const path = require('path')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(path.dirname(path.dirname(__dirname)), 'uploads/categories'))
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, shortid.generate() + '-' + file.originalname)
    }
});

const upload = multer({storage})

router.post('/category/create', requireSignin, adminMiddleWare, upload.single('categoryImage'),addCategory);
router.get('/category/getCategory', getCategories);

module.exports = router;
