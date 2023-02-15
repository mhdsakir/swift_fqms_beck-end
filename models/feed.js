const mongoose = require('mongoose')
mongoose.set('strictQuery', false)

const feedSchema = mongoose.Schema({
    shedName: {
        type: String,
        required: true
    },
    type: {
        type: String,
        requred: true
    },
    arrivalTime: {
        type: Number,
        required: true
    },
    departTime: {
        type: Number,
        default: 0
    },
    waitingTime: {
        type: Number,
        default: 0
    },
    isWaiting: {
        type: Boolean,
        default: true
    },
    isFilled: {
        type: Boolean,
        default: false
    }
})

exports.Feed = mongoose.model('Feed', feedSchema)