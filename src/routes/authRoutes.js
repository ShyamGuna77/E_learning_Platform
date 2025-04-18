

const express = require('express')
const {register,login,getMe} = require('../controllers/authController')
const {protect} = require('../middleware/auth')
const{registerSchema,loginSchema} = require('../validators/authValidator');
const {validate} = require('../middleware/validate')

const router = express.Router();

router.post('/register',validate(registerSchema),register)


router.post('/login',validate(loginSchema),login)

router.get('/me',protect,getMe)

console.log("✅ Auth routes loaded");

module.exports = router