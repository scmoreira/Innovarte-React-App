const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')

const uploader = require('../configs/cloudinary.config')

const Artworks = require('../models/artwork.model')

// Endpoints

//List of artworks
router.get('/getAllArtworks', (req, res) => {

    Artworks.find()
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
    
})

//Find one artwork
router.get('/getOneArtwork/:artwork_id', (req, res) => {

    if (!mongoose.Types.ObjectId.isValid(req.params.artwork_id)) {
        res.status(400).json({ message: 'Specified id is not valid' })
        return
    }

    Artworks.findById(req.params.artwork_id)
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
    
})

//Find the artworks of an user
router.get('/getArtworksUser/:owner_id', (req, res) => {

  Artworks.find({ owner:  req.params.owner_id })
      .then(works => { res.json(works) })
      .catch(err => res.status(500).json(err))

})

//Find the artworks of an artist
router.get('/getUserArtworks/:artist', (req, res) => {

    Artworks.find({ artist:  req.params.artist })
        .then(works => { res.json(works) })
        .catch(err => res.status(500).json(err))
  
  })

//Find artworks by tag
router.get('/getArtworksByTag/:tag', (req, res) => {

    Artworks.find({ tags:  req.params.tag })
        .then(works => { res.json(works) })
        .catch(err => res.status(500).json(err))
  
})

//Add an artwork
router.post('/newArtwork', uploader.single('image'), (req, res) => {

    const {title, description, price, currency, size, materials, artist, owner, tags } = req.body
    let imageFile = req.file.url

    Artworks.create({title, description, price, currency, size, materials, artist, owner, tags, image:imageFile })
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
    
})

//Update an artwork
router.put('/editArtwork/:artwork_id', (req, res) => {

    if (!mongoose.Types.ObjectId.isValid(req.params.artwork_id)) {
        res.status(400).json({ message: 'Specified id is not valid' })
        return
    }

    Artworks.findByIdAndUpdate(req.params.artwork_id, req.body)
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
    
})

//Delete an artwork
router.delete('/:artwork_id/deleteArtwork', (req, res) => {
     
    Artworks.findByIdAndDelete(req.params.artwork_id)
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
    
})

module.exports = router