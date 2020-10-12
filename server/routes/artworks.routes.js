const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')

const uploader = require('../configs/cloudinary.config')

const Artworks = require('../models/artwork.model')

const checkLoggedIn = (req, res, next) => req.isAuthenticated() ? next() : console.log('No autorizado!')

// Endpoints

// List of artworks
router.get('/getAllArtworks', (req, res) => {

    Artworks.find()
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
    
})

// Find one artwork
router.get('/getOneArtwork/:artwork_id', (req, res) => {

    if (!mongoose.Types.ObjectId.isValid(req.params.artwork_id)) {
        res.status(400).json({ message: 'Specified id is not valid' })
        return
    }

    Artworks.findById(req.params.artwork_id)
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
    
})

// Find the artworks of an artist
router.get('/getArtistArtworks/:artist', (req, res) => {

    Artworks.find({ artist:  req.params.artist })
        .then(works => { res.json(works) })
        .catch(err => res.status(500).json(err))
  
  })

// Find artworks by tag
router.get('/getArtworksByTag/:tag', (req, res) => {

    Artworks.find({ tags:  req.params.tag })
        .then(works => { res.json(works) })
        .catch(err => res.status(500).json(err))
  
})

// Find available artworks
router.get('/getAvailableArtworks', (req, res) => {

    Artworks.find({ available:  true })
        .then(works => { res.json(works) })
        .catch(err => res.status(500).json(err))
  
})

// Add an artwork
router.post('/newArtwork', uploader.single('image'), (req, res) => {

    const {title, description, price, currency, size, materials, artist, owner, tags } = req.body
    const imageFile = req.file.url

    Artworks.create({title, description, price, currency, size, materials, artist, owner, tags, image:imageFile })
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
    
})

// Update an artwork
router.put('/editArtwork/:artwork_id', checkLoggedIn, (req, res) => {

    const artwork = req.params.artwork_id

    if (!mongoose.Types.ObjectId.isValid(artwork)) {
        res.status(400).json({ message: 'Specified id is not valid' })
        return
    }

    Artworks.findByIdAndUpdate(artwork, req.body)
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
    
})

// Upadte artwork image
// router.put('editArtworkImage/:artwork_id', uploader.single('image'), (req, res) => {

//     const artwork = req.params.artwork_id
//     const imageFile = req.file.url

//     if (!mongoose.Types.ObjectId.isValid(artwork)) {
//         res.status(400).json({ message: 'Specified id is not valid' })
//         return
//     }

//     Artworks.findByIdAndUpdate(artwork, { image: imageFile })
//         .then(response => res.json(response))
//         .catch(err => res.status(500).json(err))
    
// })

// Delete an artwork
router.delete('/:artwork_id/deleteArtwork', checkLoggedIn, (req, res) => {
     
    Artworks.findByIdAndDelete(req.params.artwork_id)
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
    
})

module.exports = router