const mongoose = require('mongoose')
const Schema = mongoose.Schema

const appointmentSchema = new  Schema({
    profile: JSON,
    date: String,
    time: String,
    topic: String,
    
})

appointmentSchema.statics.checkAvailableTime = function(date, time){
    return this.findOne({date:date, time:time})
}
appointmentSchema.query.byId = function(userID){
    return this.find({'profile.userID':userID})
}
appointmentSchema.query.byDate = function(date){
    return this.where({date:date})
}
appointmentSchema.statics.findLatest = function(userID){
    return this.findOne({ 'profile.userID': userID }, {}, { sort: { '_id': -1 } })
}

module.exports = mongoose.model('Appointment', appointmentSchema)