const express = require("express")
const router = express.Router()
const passport = require("passport")
const bcrypt = require("bcrypt")

const User = require("../models/user.model")

router.post('/signup', (req, res) => {

    const { username, password, avatar, email, role } = req.body
    
    if (!username || !password || !email) {
        res.status(400).json({ message: 'Rellena los campos con *' })
        return
    }

    if (password.length < 5) {
        res.status(400).json({ message: 'Password débil' })
        return
    }

    User.findOne({ username }, (err, foundUser) => {

        if (err) {
            res.status(500).json({ message: "Error al chequear usuario" })
            return
        }

        if (foundUser) {
            res.status(400).json({ message: 'Usario no disponible' })
            return
        }

        const salt = bcrypt.genSaltSync(10)
        const hashPass = bcrypt.hashSync(password, salt)

        const aNewUser = new User({ username, password: hashPass, avatar, email, role })

        aNewUser.save(err => {
            if (err) {
                res.status(500).json({ message: 'Error al registrar usuario' })
                return
            }

            req.login(aNewUser, (err) => {

                if (err) {
                    res.status(500).json({ message: 'Error de login' })
                    return
                }

                res.status(200).json(aNewUser)
            })
        })
    })
})


router.post('/login', (req, res, next) => {
    passport.authenticate('local', (err, theUser, failureDetails) => {
        if (err) {
            res.status(500).json({ message: 'Error de autenticación' })
            return
        }

        if (!theUser) {
            res.status(401).json(failureDetails)
            return
        }

        req.login(theUser, (err) => {
            if (err) {
                res.status(500).json({ message: 'Error de sesión' })
                return
            }

            res.status(200).json(theUser)
        })
    })(req, res, next)
})

router.post('/logout', (req, res) => {
    req.logout()
    res.status(200).json({ message: 'Sesión cerrada!' })
});

router.get('/loggedin', (req, res) => {
    if (req.isAuthenticated()) {
        res.status(200).json(req.user)
        return
    }
    res.status(403).json({ message: 'Sin autorización' })
})

module.exports = router