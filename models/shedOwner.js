const mongoose = require('mongoose')
mongoose.set('strictQuery', false)

const shedOwnerSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    userName: {
        type: String,
        requred: true
    },
    passwordHash: {
        type: String,
        required: true
    }
})


exports.ShedOwner = mongoose.model('ShedOwner', shedOwnerSchema)
