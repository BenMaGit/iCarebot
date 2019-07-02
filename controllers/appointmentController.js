const Appointment = require('../models/appointment')
const Profile = require('../models/profile')
const autoReply = require('../utils/replyHandler')
const template = require('../utils/templates')


const generateAvailableTimeSlot = async (date) =>{
    let schedule =['9:00AM', '10:00AM', '11:00AM', '13:00PM', '14:00PM', '15:00PM']
    let availableSlot = []
    let bookedSlot =[]
    let actionArray = []
    let columnArray = []
    let appointmentDate = await Appointment.find().byDate(date)
    for(let j = 0; j < appointmentDate.length; j++){
        bookedSlot.push(appointmentDate[j].time)
    }
    for(let i = 0; i < schedule.length; i ++){
        if(bookedSlot.includes(schedule[i])){
            continue
        }
        let actionLength = actionArray.push(template.timeActionTemplate(schedule[i]))
        for(var property in template.timeActionTemplate(schedule[i])){
            console.log(template.timeActionTemplate(schedule[i])[property])
        }
        //一個 actionTemplate 只會有三個actions
        if(actionLength == 3){
            columnArray.push(template.timeColumnTemplate(actionArray))
            for(var property in template.timeColumnTemplate(actionArray)){
                console.log(template.timeColumnTemplate(actionArray)[property])
            }
            actionArray = []
        }
    }
    if(actionArray.length != 0){
        columnArray.push(template.timeColumnTemplate(actionArray))
    }
  /*   for(var property in template.timeTemplate(columnArray)){
        console.log(template.timeTemplate(columnArray)[property])
    } */
    let carouselTemplate = template.timeTemplate(columnArray)
    return carouselTemplate
    
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