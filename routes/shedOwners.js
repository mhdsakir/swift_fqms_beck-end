const {ShedOwner} = require('../models/shedOwner')
const express = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const router = express.Router()


// register shed owner
router.post('/register', async (req, res) => {
    let shedOwner = new ShedOwner({
        name: req.body.name,
        userName: req.body.userName,
        passwordHash: bcrypt.hashSync(req.body.password, 10)
    })

    shedOwner = await shedOwner.save()

    if(!shedOwner){
        return res.status(404).send('The Shed Owner cannot be created!')
    }

    res.send(shedOwner)
})


// login shed owner
router.post('/login', async (req, res) => {
    // check user name
    const shedOwner = await ShedOwner.findOne({userName: req.body.userName})
    const secret = process.env.secret

    if(!shedOwner){
        return res.status(400).send('The Shed owner is not found')
    }

    // check password
    if(shedOwner && bcrypt.compareSync(req.body.password, shedOwner.passwordHash)){
        const token = jwt.sign(
            {
                shedOwnerId: shedOwner.id,
            },
            secret,
            {
                expiresIn: '1d'
            }
        )

        return res.status(200).send({shedOwner: shedOwner.userName, token: token})

    } else {
        res.status(400).send('Password is Wrong !')
    }
})

module.exports = router