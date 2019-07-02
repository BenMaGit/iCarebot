const mongoose = require('mongoose')
const Schema = mongoose.Schema

const appointmentSchema = new  Schema({
    profile: JSON,
    date: String,
    time: String
})

appointmentSchema.statics.checkAvailableTime = function(date, time){
    return this.findOne({date:date, time:time})
}
appointmentSchema.statics.checkExistingAppt = function(userID){
    return this.findOne({'profile.userID':userID})
}
appointmentSchema.methods.findAvailableTime = function(date){
    return this.model('Appointment').find({date:date})
}

module.exports = mongoose.model('Appointment', appointmentSchema)