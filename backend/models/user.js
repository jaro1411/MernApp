const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require('validator')


const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
})

userSchema.statics.signup = async function(email,password) {

    if(!email || !password) {
        throw new Error('pls fill all fields')
    }

    if(!validator.isEmail(email)){
        throw new Error('Not a valid email')
    }

    if(!validator.isStrongPassword(password)) {
        throw new Error('Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character.')
    }

    const exists = await this.findOne({ email})
    
    if(exists) {
        throw new Error('Email already exists')
    }

    const salt = await bcrypt.genSalt(10)

    const hash = await bcrypt.hash(password, salt)

    const user = await this.create({ email, password: hash })

    return user

}


userSchema.statics.login = async function(email,password) {

     if(!email || !password) {
        throw new Error('pls fill all fields')
    }

    const user = await this.findOne({ email})
    
    if(!user) {
        throw new Error('Invalid user')
    }

    const match = await bcrypt.compare(password, user.password)

    if(!match) {
        throw new Error('Invalid credentials')
    }

    return user
}


module.exports = mongoose.model('User', userSchema)