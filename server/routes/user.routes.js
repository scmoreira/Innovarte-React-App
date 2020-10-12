const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')

const bcrypt = require("bcrypt")
const bcryptSalt = 10

const uploader = require('../configs/cloudinary.config')

const User = require('./../models/user.model')
const Artworks = require('./../models/artwork.model')

const checkLoggedIn = (req, res, next) => req.isAuthenticated() ? next() : console.log('No autorizado!')


// Endpoints

// Update profile
router.put('/editProfile/:user_id', checkLoggedIn, (req, res) => {

    const user = req.params.user_id
    const {
        username,
        email,
        password,
        role
    } = req.body

    const salt = bcrypt.genSaltSync(bcryptSalt)
    const hashPass = bcrypt.hashSync(password, salt)

    if (!mongoose.Types.ObjectId.isValid(user)) {
        res.status(400).json({
            message: 'Specified id is not valid'
        })
        return
    }

    User.findByIdAndUpdate(user, {
            username,
            email,
            password: hashPass,
            role
        })
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))

})

// Upload avatar
// router.put('editProfileImage/:user_id', uploader.single('avatar'), (req, res) => {

//     const user = req.params.artwork_id
//     const imageFile = req.file.url

//     if (!mongoose.Types.ObjectId.isValid(user)) {
//         res.status(400).json({ message: 'Specified id is not valid' })
//         return
//     }

//     Artworks.findByIdAndUpdate(user, { avatar: imageFile })
//         .then(response => res.json(response))
//         .catch(err => res.status(500).json(err))

// })

// Get all user artworks 
router.get('/allUserArtworks/:user_id', checkLoggedIn, (req, res) => {

    const user = req.params.user_id

    if (!mongoose.Types.ObjectId.isValid(user)) {
        res.status(400).json({
            message: 'Specified id is not valid'
        })
        return
    }

    Artworks.find({
            owner: user
        })
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))

})

// Get buyed artworks
router.get('/buyedArtworks/:user_id', checkLoggedIn, (req, res) => {

    const user = req.params.user_id

    if (!mongoose.Types.ObjectId.isValid(user)) {
        res.status(400).json({
            message: 'Specified id is not valid'
        })
        return
    }

    User.findById(user, {
            buyed: 1
        })
        .then(response => Artworks.find({
            _id: response
        }))
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))

})

// Get available artworks to sell (only artists)
router.get('/onSellArtworks/:user_id', checkLoggedIn, (req, res) => {

    const user = req.params.user_id

    if (!mongoose.Types.ObjectId.isValid(user)) {
        res.status(400).json({
            message: 'Specified id is not valid'
        })
        return
    }

    Artworks.find({
            owner: user,
            available: true
        })
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))

})

// Get sold artworks (only artists)
router.get('/soldArtworks/:user_id', checkLoggedIn, (req, res) => {

    const user = req.params.user_id

    if (!mongoose.Types.ObjectId.isValid(user)) {
        res.status(400).json({
            message: 'Specified id is not valid'
        })
        return
    }

    Artworks.find({
            owner: user,
            available: false
        })
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))

})

// Get user cart info
router.get('/cart/:user_id', checkLoggedIn, (req, res) => {

    const user = req.params.user_id

    if (!mongoose.Types.ObjectId.isValid(user)) {
        res.status(400).json({
            message: 'Specified id is not valid'
        })
        return
    }

    User.findById(user, {
            cart: 1
        })
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))

})

// Add item to user cart
router.put('/cart/:user_id/:artwork_id', checkLoggedIn, (req, res) => {

    const user = req.params.user_id
    const userCart = req.user.cart
    const cartItem = req.params.artwork_id

    if (!mongoose.Types.ObjectId.isValid(user)) {
        res.status(400).json({
            message: 'Specified id is not valid'
        })
        return
    }

    if (!userCart.includes(cartItem)) {
    userCart.push(cartItem)

        User.findByIdAndUpdate(user, { cart: userCart })
            .then(response => res.json(response))
            .catch(err => res.status(500).json(err))

    } else {
        console.log('Item ya agregado')
    }
})

// Delete item to user cart
router.put('/cart/:artwork_id:artwork_id', checkLoggedIn, (req, res) => {

    const user = req.params.user._id
    const userCart = req.user.cart
    const cartItem = req.params.artwork_id

    if (!mongoose.Types.ObjectId.isValid(user)) {
        res.status(400).json({ message: 'Specified id is not valid' })
        return
    }

    if (user.includes(cartItem)) {

        let itemIndex = userCart.indexOf(cartItem)

        userCart.splice(itemIndex, 1)

        User.findByIdAndUpdate(user, { $pop: {cart: userCart} })
            .then(response => res.json(response))
            .catch(err => res.status(500).json(err))

    } else {
        console.log('Item no encontrado')
    } 
})

module.exports = router