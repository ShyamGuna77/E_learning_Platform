

const express = require('express')
const {register,login,getMe} = require('../controllers/authController')
const {protect} = require('../middleware/auth')
const{registerSchema,loginSchema} = require('../validators/authValidator');
const { validate } = require('../models/User');

const router = express.Router();

router.post('/register',validate(registerSchema),register)

router.post('./login',validate(loginSchema),login)

router.get('/me',protect,getMe)

module.exports = router