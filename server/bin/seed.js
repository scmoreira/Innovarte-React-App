const mongoose = require('mongoose')
const Artworks = require('./../models/artwork.model')
const User = require('./../models/artwork.model')

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
        artist: 'Leonardo Da Vinci'
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
        artist: 'Miguel Ángel'
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
        artist: 'Picasso'
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
        artist: 'Rodin'
    }
]

const users = [
    {
        username: 'cecilia',
        password: 'cecilia',
        email: 'cecilia@email.com',
        role: 'ADMIN'
    }
]

let createArtworks = Artworks.create(artworks)
let createUsers = User.create(users)

Promise.all([createArtworks, createUsers])
    .then(results => {
        console.log(results[0], 'artworks created and ', results[1], 'users created.')
    })
    .catch(err => console.log(err))
     


// Artworks.create(artworks)
//     .then(allArtworks => 
//         console.log(allArtworks.length, 'artworks have been created.')
//     )
//     .catch(err => console.log('ERROR: ', err))

// User.create(users)
// .then(allUsers => 
//     console.log(allUsers.length, 'users have been created.')
// )
// .catch(err => console.log('ERROR: ', err))