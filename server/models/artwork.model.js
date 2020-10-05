const mongoose = require('mongoose')
const Schema = mongoose.Schema

const artworkSchema = new Schema({
    title: {
        type: String,
        required: true,
        uppercase: true
    },
    image: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    size: {
        type: String,
        required: true
    },
    materials: {
        type: String,
        lowercase: true
    },
    currency: {
        type: String,
        default: 'EUR'
    },
    price: {
        type: Number,
        required: true
    },
    tags: {
        type: String,
        enum: ['Pintura', 'Escultura', 'Dibujo', 'Artesanía', 'Fotografía', 'Otros'],
        default: 'Otros'
    }, 
    artist: {
        type: String,
        required: true,
    },
    owner: {
        type: Schema.Types.ObjectId,
        rel: 'User'
    }
}, {
    timestamps: true
})

const Artwork = mongoose.model('Artwork', artworkSchema)
module.exports = Artwork