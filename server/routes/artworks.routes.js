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

    Artworks.find({ tags: req.params.tag, available: true })
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
router.post('/newArtwork', uploader.single('image'), checkLoggedIn, (req, res) => {

    const {title, description, price, currency, size, materials, artist, owner, tags } = req.body
    const imageFile = req.file.url

    Artworks.create({title, description, price, currency, size, materials, artist, owner, tags, image:imageFile })
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
    
})

// Update an artwork
router.put('/editArtwork/:artwork_id', uploader.single('image'), checkLoggedIn, (req, res) => {

    console.log(checkLoggedIn)
    
    const artwork = req.params.artwork_id
    const { title, description, price, currency, size, materials, artist, owner, tags } = req.body
    
    const img = req.file ? req.file.url : req.body.image

    if (!mongoose.Types.ObjectId.isValid(artwork)) {
        res.status(400).json({ message: 'Specified id is not valid' })
        return
    }

    Artworks.findByIdAndUpdate(artwork, { title, description, price, currency, size, materials, artist, owner, tags, image: img }, {new: true})
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
    
})

// Update artwork state (if sold)
router.put('/artworkSold/:artwork_id', (req, res) => {

    const artwork = req.params.artwork_id

    if (!mongoose.Types.ObjectId.isValid(artwork)) {
        res.status(400).json({ message: 'Specified id is not valid' })
        return
    }

    Artworks.findByIdAndUpdate(artwork, { $set: { available: false } }, { new: true })
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
    
})

// Delete an artwork
router.delete('/:artwork_id/deleteArtwork', checkLoggedIn, (req, res) => {

    const artwork = req.params.artwork_id

    if (!mongoose.Types.ObjectId.isValid(artwork)) {
        res.status(400).json({ message: 'Specified id is not valid' })
        return
    }
     
    Artworks.findByIdAndDelete(artwork)
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
    
})

module.exports = router