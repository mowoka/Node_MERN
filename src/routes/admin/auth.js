const express = require('express');
const { signup, signin } = require('../../controllers/admin/auth');
const {
  validateSignupRequest,
  isRequestValidated,
  validateSigninRequest,
} = require('../../validators/auth');
const { requireSignin } = require('../../middleware');

const router = express.Router();

router.post('/admin/signup', validateSignupRequest, isRequestValidated, signup);
router.post('/admin/signin', validateSigninRequest, isRequestValidated, signin);

module.exports = router;
