const Cart = require('../models/cart')

exports.addItemToCart = (req, res) => {
    

    Cart.findOne({ user: req.user._id })
    .exec((error, cart) => {
        if(error) return res.status(400).json({
            status: false,
            error
        })

        if(cart){
            // if cart already exist then update cart by quantity

            const product = req.body.cartItems.product;
            const item = cart.cartItems.find(c => c.product == product);

            let condition, action;

            if(item){
                condition = { user: req.user._id, "cartItems.product":product };
                action = {
                    "$set": {
                        "cartItems.$": {
                            ...req.body.cartItems,
                            quantity: item.quantity + req.body.cartItems.quantity
                        }
                    }
                }
            }else{
                condition = { user: req.user._id}
                action =  {
                    "$push": {
                        "cartItems": req.body.cartItems
                    }
                }
            }
            Cart.findOneAndUpdate(condition, action).exec((error, cart) => {
                if(error) return res.status(400).json({
                    status: false,
                    message: error
                })

                if(cart) return res.status(200).json({
                    status: true,
                    message: 'update cart successs',
                    data: cart
                })
            })
        }else{
            // if cart not exists then create new cart
            const cart = new Cart({
                user: req.user._id,
                cartItems: [req.body.cartItems]
            })
        
        
            cart.save((error, cart)=>{
                if(error) return res.status(400).json({
                    status: false,
                    error
                })
        
                if(cart) return res.status(200).json({
                    status: true,
                    message: 'add cart sucesss',
                    data: cart
                })
            })

        }
    })

 
}