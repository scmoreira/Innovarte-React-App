const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')

const Artworks = require('../models/artwork.model')

// Endpoints

//List of artworks
router.get('/getAllArtworks', (req, res) => {

    Artworks.find()
        .populate('owner')
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
        .populate('owner')
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
    
})

//Find the artworks of an user
// router.get('/artworks/:owner_id', (req, res) => {

//   Artworks.find({ owner:  req.params.owner_id })
//       .then(works => { res.json(works) })
//       .catch(err => res.status(500).json(err))

// })

//Add an artwork
router.post('/newArtwork', (req, res) => {

    Artworks.create(req.body)
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