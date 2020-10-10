const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')

const uploader = require('../configs/cloudinary.config')

const User = require('./../models/user.model')

// Endpoints

// Update profile
router.put('/editProfile/:user_id', (req, res) => {

    if (!mongoose.Types.ObjectId.isValid(req.params.user_id)) {
        res.status(400).json({ message: 'Specified id is not valid' })
        return
    }

    User.findByIdAndUpdate(req.params.user_id, req.body)
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
    
})

// Get buyed artworks
router.get('/buyedArtworks/:user_id', (req, res) => {

    if (!mongoose.Types.ObjectId.isValid(req.params.user_id)) {
        res.status(400).json({ message: 'Specified id is not valid' })
        return
    }

    User.findById(req.params.user_id)
})

module.exports = router

