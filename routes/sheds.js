const {Shed} = require('../models/shed')
const express = require('express')
const router = express.Router()

// register shed owner
router.post('/register', async (req, res) => {
    let shed = new Shed({
        owner: req.body.owner,
        shedName: req.body.shedName,
        availability: req.body.availability
    })

    shed = await shed.save()

    if(!shed){
        return res.status(404).send('The Shed cannot be created!')
    }

    res.send(shed)
})


// get shed list
router.get('/list', async (req, res) => {
    const shedList = await Shed.find()

    if(!shedList) {
        res.status(500).json({success: false})
    }
    res.send(shedList)
})

// update shed fuel availability
router.put('/:id', async(req, res) => {
    const shed = await Shed.findByIdAndUpdate(
        req.params.id,
        {
            availability: req.body.availability
        },
        {new: true}
    )

    if(!shed) 
        return res.status(404).send('The order cannot be created !')
    
    res.send(shed)
})



module.exports = router