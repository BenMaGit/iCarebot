const mongoose = require('mongoose')
const Schema = mongoose.Schema

const appointmentSchema = new  Schema({
    profile: JSON,
    date: String,
    time: String
})


module.exports = mongoose.model('Appointment', appointmentSchema)