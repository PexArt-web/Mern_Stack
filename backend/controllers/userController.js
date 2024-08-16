const User = require('../models/usersModel')

const { log } = console
const signUpUser = async (req, res)=>{
    const { email, password } = req.body
    try {
       const user = await User.signup(email, password)
       res.status(201).json({ message: 'User created successfully', user })
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

module.exports = {
    signUpUser
}