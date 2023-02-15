const mongoose = require('mongoose')
mongoose.set('strictQuery', false)

const shedSchema = mongoose.Schema({
    owner: {
        type: String,
        required: true
    },
    shedName: {
        type: String,
        required: true
    },
    availability:{
        type: Boolean,
        default: false,
    },
    petrolVehicleCount:{
        type: Number,
        default: 0
    },
    dieselVehicleCount: {
        type: Number,
        default: 0
    },
    averageWaitingTimePetrol: {
        type: Number,
        default: 0,
    },
    averageWaitingTimeDiesel: {
        type: Number,
        default: 0
    }
})

exports.Shed = mongoose.model('Shed', shedSchema)