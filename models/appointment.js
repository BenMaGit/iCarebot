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
appointmentSchema.statics.findByID = function(userID){
    return this.findOne({'profile.userID':userID})
}
appointmentSchema.query.byDate = function(date){
    return this.where({date:date})
}

module.exports = mongoose.model('Appointment', appointmentSchema)