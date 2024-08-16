const express = require('express');
const router = express.Router()
const { signUpUser } = require('../controllers/userController')


router.post('/signup', signUpUser)

router.post('/loginIn', ()=>{})


module.exports = router