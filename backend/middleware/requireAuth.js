const jwt =  require('jsonwebtoken');
const SECRET = process.env.SECRET
const User = require('../models/usersModel')

// 
const requireAuth = async (req, res, next)=>{
    const { authorization } = req.headers
    
    if(!authorization){
        return res.status(400).json({error: 'Authorization token required'})
    }

    // split token from authorization
    const token = authorization.split(' ')[1]
    // destructure _id from jwt token remember we passed the id while creating the jwt token
    const { _id } = jwt.verify(token, SECRET)

    // check the user id with the one in database
    try {
        req.user = await User.findOne({_id}).select('_id')
        next()
    } catch (error) {
        res.status(400).json({error: 'request not authorized'})
    }

}

module.exports = requireAuth