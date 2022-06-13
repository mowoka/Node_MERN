const User = require('../models/user');
const jwt = require('jsonwebtoken');

exports.signup = (req, res) => {
  User.findOne({ email: req.body.email }).exec((error, user) => {
    if (user)
      return res.status(400).json({
        message: 'User already register',
      });

    const { firstName, lastName, email, password } = req.body;

    const _user = new User({
      firstName,
      lastName,
      email,
      password,
      username: Math.random().toString(),
    });

    _user.save((error, data) => {
      if (error)
        return res.status(400).json({
          message: 'Something went wrong',
          error,
        });

      if (data)
        return res.status(200).json({
          message: 'User created success',
        });
    });
  });
};

exports.signin = (req, res) => {
  User.findOne({ email: req.body.email }).exec((error, user) => {
    if (error)
      return res.status(400).json({
        message: error,
      });

    if (user) {
      if (user.authenticate(req.body.password)) {
        const token = jwt.sign({ _id: user?._id, role: user?.role }, process.env.JWT_SECRET, {
          expiresIn: '1d',
        });

        const { _id, firstName, lastName, email, role, fullName } = user;

        return res.status(200).json({
          status: true,
          message: 'Login success',
          token,
          data: { _id, firstName, lastName, email, role, fullName },
        });
      }
    } else {
      return res.status(400).json({
        message: 'Invalid credential',
      });
    }

    return res.status(400).json({
      message: 'Something wrong',
    });
  });
};
