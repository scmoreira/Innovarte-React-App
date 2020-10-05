const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        minlength: 5,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
        minlength:5,
    },
    avatar: {
        type: String,
        default: '/images/avatar-default.png',
    },
    email: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['ADMIN', 'USER', 'ARTIST'],
        default: 'USER'
    },
    cart: {
        type: [String],
        default: []
    },
    sold: {
        type: [String],
        default: []
    }
}, {
    timestamps: true
})

const User = mongoose.model('User', userSchema)
module.exports = User


