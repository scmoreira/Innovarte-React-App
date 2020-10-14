const mongoose = require('mongoose')
const Artworks = require('./../models/artwork.model')
const User = require('./../models/user.model')

const nameDb = 'innovarte'
mongoose.connect(`mongodb://localhost/${nameDb}`, { useNewUrlParser: true, useUnifiedTopology: true })

Artworks.collection.drop()
User.collection.drop()

const artworks = [
    {
        title: 'La Gioconda',
        image: 'https://aws.admagazine.com/prod/designs/v1/assets/620x818/68699.jpg',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut sit amet est diam. Nullam eleifend suscipit dictum.',
        size: '77x53',
        materials: 'óleo',
        currency: 'USD',
        price: 2000000,
        tags: 'Pintura',
        artist: 'Leonardo Da Vinci',
        owner:'5f80296e033ae173994875e1'
    },
    {
        title: 'El David',
        image: 'https://www.guias.travel/blog/wp-content/uploads/2013/07/David-1.jpg',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut sit amet est diam. Nullam eleifend suscipit dictum.',
        size: '517',
        materials: 'mármol',
        currency: 'USD',
        price: 1500000,
        tags: 'Escultura', 
        artist: 'Miguel Ángel',
        owner:'5f80296e033ae173994875e1'
    },
    {
        title: 'Guernica',
        image: 'https://upload.wikimedia.org/wikipedia/commons/6/6f/Mural_del_Gernika.jpg',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut sit amet est diam. Nullam eleifend suscipit dictum.',
        size: '349x777',
        materials: 'óleo',
        currency: 'EUR',
        price: 1000000,
        tags: 'Pintura',
        artist: 'Picasso',
        owner:'5f80296e033ae173994875e1'
    },
    {
        title: 'El Pensador',
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/56/The_Thinker%2C_Rodin.jpg/245px-The_Thinker%2C_Rodin.jpg',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut sit amet est diam. Nullam eleifend suscipit dictum.',
        size: '183.6x97',
        materials: 'bronce',
        currency: 'EUR',
        price: 2000000,
        tags: 'Escultura',
        artist: 'Rodin',
        owner: '5f80296e033ae173994875e1'
    },
    {
        title: 'Vasija de portlan',
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8f/Portland_Vase_BM_Gem4036_n5.jpg/800px-Portland_Vase_BM_Gem4036_n5.jpg',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut sit amet est diam. Nullam eleifend suscipit dictum.',
        size: '20x17.7',
        materials: 'cristal azul',
        currency: 'EUR',
        price: 2000000,
        tags: 'Artesanía',
        artist: 'Desconocido',
        owner: '5f80296e033ae173994875e1'
    }
]
https://upload.wikimedia.org/wikipedia/commons/thumb/8/8f/Portland_Vase_BM_Gem4036_n5.jpg/800px-Portland_Vase_BM_Gem4036_n5.jpg
const users = [
    {
        username: 'cecilia',
        password: 'cecilia',
        email: 'cecilia@email.com',
        role: 'admin'
    },
    {
        username: 'artista',
        password: 'artista',
        email: 'artista@email.com',
        role: 'artista'
    }
]

let createArtworks = Artworks.create(artworks)
let createUsers = User.create(users)

Promise.all([createArtworks, createUsers])
    .then(results => {console.log(results[0].length, 'artworks created and ', results[1].length, 'users created.')})
    .then(() => mongoose.connection.close())
    .catch(err => console.log(err))
     