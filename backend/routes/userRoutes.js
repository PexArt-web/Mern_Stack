const express = require('express');
const router = express.Router()
const { signUpUser, login } = require('../controllers/userController')


router.post('/signup', signUpUser)

router.post('/login', login)


module.exports = router