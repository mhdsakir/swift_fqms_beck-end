const {Feed} = require('../models/feed')
const express = require('express')
const router = express.Router()

router.post('/setfeed', async (req, res) => {
    let feed = new Feed({
        shedName: req.body.shedName,
        type: req.body.type,
        arrivalTime: req.body.arrivalTime,
        departTime: req.body.departTime,
        waitingTime: req.body.waitingTime,
        isWaiting: req.body.isWaiting,
    })

    feed = await feed.save()

    if(!feed){
        return res.status(404).send('The feed cannot be created!')
    }

    res.send(feed)
})

router.put('/:id', async (req, res) => {
  const feedItem = await Feed.findByIdAndUpdate(
    req.params.id,
    {
      departTime: req.body.departTime,
      isFilled: req.body.isFilled,
      isWaiting: false
    },
    { new: true }
  )

  if (!feedItem)
    return res.status(404).send('The order cannot be created !')

  res.send(feedItem)
})

router.get('/list', async (req, res) => {
  const feedList = await Feed.find()

  if (!feedList) {
    res.status(500).json({ success: false })
  }
  res.send(feedList)
})

module.exports = router