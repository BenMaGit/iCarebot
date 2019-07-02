const Appointment = require('../models/appointment')
const Profile = require('../models/profile')
const autoReply = require('../utils/replyHandler')
const template = require('../utils/templates')


const generateAvailableTimeSlot = async (event, date) =>{
    let schedule =['9:00', '10:00', '11:00', '13:00', '14:00', '15:00']
    let availableSlot = []
    let appointmentDate = await Appointment.findAvailableTime(date)
    console.log(appointmentDate +" appDate")
    for(let i = 0; i < schedule.length; i ++){
        for(let j = 0; j < appointmentDate.length; j++){
            console.log(appointmentDate[j]+" bookedAppointment")
            console.log(appointmentDate[j].time+" booked")
            if(schedule[i] === appointmentDate[j].time){
                continue
            }
            console.log(schedule[i])
            availableSlot.push(schedule[i])
        }
    }
}
const confirmAppointment = async (event, date, time) =>{
    let existingAppt = await Appointment.checkExistingAppt(event.source.userId)
    if(existingAppt){
        await existingAppt.remove()
    }
    let timeSlot = await Appointment.checkAvailableTime(date, time)
    if(!timeSlot){
        console.log('Creating Appointment')
        let appointment = new Appointment({
            profile: {
                "Name": "Subject one",
                "userID": event.source.userId},
            date: date,
            time: time
        })
        appointment.save().then(()=>{
            autoReply.replyHandler(event, '預約成功!' )
    
        })
    }else{
        autoReply.replyHandler(event, '已有人預約這個時段' )
    }
}

const lookUpAppointment = async (event) =>{
    let appointment = await Appointment.checkExistingAppt(event.source.userId)
    if(!appointment){
        autoReply.replyHandler(event, '您沒有任何預約')
    }else{
        autoReply.replyHandler(event, '您預約的時段是: ' + appointment.date + ' ' + appointment.time)
    }
}



module.exports = {
    confirmAppointment,
    lookUpAppointment,
    generateAvailableTimeSlot

}