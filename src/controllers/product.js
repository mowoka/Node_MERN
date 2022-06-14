const Product = require('../models/product');
const slugify = require('slugify')

exports.addProduct = (req, res) => {

    const {
        name,
        price,
        description,
        category,
        createBy,
        quantity
     } = req.body;

    let productPictures = [];

    if(req.files.length > 0){
        productPictures = req.files.map(file => {
            return {
                img: file.filename
            }
        })
    }

    const product = new Product({
        name,
        slug: slugify(name),
        price,
        description,
        productPictures,
        category,
        createBy: req.user._id,
        quantity
    });

    product.save(((error, product) => {
        if(error) return res.status(400).json({
            status: false,
            error
        });

        if(product) return res.status(200).json({
            status: true,
            message: 'create product success',
            data: product
        });
    }))
}