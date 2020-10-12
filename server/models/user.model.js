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
        enum: ['admin', 'usuario', 'artista'],
        required: true
    },
    cart: {
        type: [String],
    },
    buyed: {
        type: [String],
    },
    sold: {
        type: [String],
    },
}, {
    timestamps: true
})

const User = mongoose.model('User', userSchema)
module.exports = User


