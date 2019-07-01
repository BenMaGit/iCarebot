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
appointmentSchema.statics.deleteExistingAppt = function(userID){
    collection = mongoose.collection('appointment')
    return collection.deleteOne({'profile.userID':userID})
}
module.exports = mongoose.model('Appointment', appointmentSchema)