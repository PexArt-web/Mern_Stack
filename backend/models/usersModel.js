const mongoose = require('mongoose')
const Schema = mongoose.Schema
const validator = require('validator')
const bcrypt = require('bcryptjs')
const saltRound = 10

const userSchema = new Schema({
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    }
}, {timestamps: true})

// signup static method for salt and hashing password

userSchema.statics.signup = async function(email, password ){
    // validation
    if(!email || !password){
        throw Error('Please provide an email and password')
    }
    if(!validator.isEmail(email)){
        throw Error('Please provide a valid email')
    }
    if(!validator.isStrongPassword(password)){
        throw Error('Password should be strong and contain at least 8 characters')
    }
    try {
        const existingUser = await this.findOne({email})
        if(existingUser){
            throw Error(`User: ${email} already exists`)
        }
        const salt = await bcrypt.genSalt(saltRound)
        const hashedPassword = await bcrypt.hash(password, salt)
        const user = await this.create({email: email, password: hashedPassword})
        return user
    } catch (error) {
        throw error
        
    }
}

const User = mongoose.model('User', userSchema)

module.exports = User