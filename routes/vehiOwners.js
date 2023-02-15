const {VehiOwner} = require('../models/vehiOwner')
const express = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const router = express.Router()


// register vehical owner
router.post('/register', async (req, res) => {
    let vehiOwner = new VehiOwner({
        name: req.body.name,
        vehiType: req.body.vehiType,
        userName: req.body.userName,
        passwordHash: bcrypt.hashSync(req.body.password, 10)
    })

    vehiOwner = await vehiOwner.save()

    if(!vehiOwner){
        return res.status(404).send('The Vehical Owner cannot be created!')
    }

    res.send(vehiOwner)
})

// login vehi owner
router.post('/login', async (req, res) => {
    // check user name
    const vehiOwner = await VehiOwner.findOne({userName: req.body.userName})
    const secret = process.env.secret

    if(!vehiOwner){
        return res.status(400).send('The Shed owner is not found')
    }

    // check password
    if(vehiOwner && bcrypt.compareSync(req.body.password, vehiOwner.passwordHash)){
        const token = jwt.sign(
            {
                userName: vehiOwner.userName,
            },
            secret,
            {
                expiresIn: '1d'
            }
        )

        return res.status(200).send({vehiOwner: vehiOwner.userName, token: token})
    } else {
        res.status(400).send('Password is Wrong !')
    }
})

module.exports = router