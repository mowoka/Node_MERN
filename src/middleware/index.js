const jwt = require('jsonwebtoken');

exports.requireSignin = (req, res, next) => {
  if(!req.headers.authorization){
    return res.status(400).json({
      status: false,
      message: 'Authorization required'
    })
  }
  const token = req.headers.authorization.split(' ')[1];
  const user = jwt.verify(token, process.env.JWT_SECRET);
  req.user = user;
  next();
};


exports.userMiddleWare = (req, res, next) =>{
  if(req.user.role !== 'user'){
    return res.status(400).json({
      status: false,
      message:'User access denied'
    })
  }
  next();
}

exports.adminMiddleWare = (req, res, next) =>{
  if(req.user.role !== 'admin'){
    return res.status(400).json({
      status: false,
      message:'Admin access denied'
    })
  }
  next();
}