const mongoose = require('mongoose')
const User = require('./../models/artwork.model')

const nameDb = 'innovarte'
mongoose.connect(`mongodb://localhost/${nameDb}`, { useNewUrlParser: true, useUnifiedTopology: true })

User.collection.drop()

const users = [
    {
        username: 'cecilia',
        password: 'cecilia',
        email: 'cecilia@email.com',
        role: 'ADMIN'
    }
]

User.create(users)
    .then(allUsers => {
        console.log(allUsers.length, 'users have been created.')
        mongoose.connection.close()
    })
    .catch(err => console.log('ERROR: ', err))

