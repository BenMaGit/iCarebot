const Appointment = require('../models/appointment')
const Profile = require('../models/profile')
const autoReply = require('../utils/replyHandler')
const template = require('../utils/templates')


const generateAvailableTimeSlot = async (date) =>{
    let schedule =['9:00AM', '10:00AM', '11:00AM', '13:00PM', '14:00PM', '15:00PM']
    let bookedSlot =[]
    let actionArray = []
    let columnArray = []
    let appointmentDate = await Appointment.find().byDate(date)
    for(let j = 0; j < appointmentDate.length; j++){
        bookedSlot.push(appointmentDate[j].time)
    }
    //如果時段已滿
    if(bookedSlot.length == 6){
        return
    }
    for(let i = 0; i < schedule.length; i ++){
        if(bookedSlot.includes(schedule[i])){
            continue
        }
        let actionLength = actionArray.push(template.timeActionTemplate(schedule[i]))
        //console.log(JSON.stringify(template.timeActionTemplate(schedule[i])))
        //一個 actionTemplate 只會有三個actions
        if(actionLength == 3){
            columnArray.push(template.timeColumnTemplate(actionArray))
            console.log(JSON.stringify(template.timeColumnTemplate(actionArray)))
            actionArray = []
        }
    }
    //補滿actions 
    while(actionArray.length < 3 && actionArray.length != 0){
        actionArray.push(template.timeActionTemplate('-'))
    }
    //console.log(JSON.stringify(actionArray))
    //需要一個新的column 
    if(actionArray.length == 3){
        columnArray.push(template.timeColumnTemplate(actionArray))
    }
    let carouselTemplate = new template.timeTemplate(columnArray)
    return carouselTemplate
}
const confirmAppointment = async (event, date, time) =>{
    let existingAppt = await Appointment.checkExistingAppt(event.source.userId)
    if(existingAppt){
        await existingAppt.remove()
    }
    let timeSlot = await Appointment.checkAvailableTime(date, time)
    if(date !== '' && time !==''){
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
    }else{
        autoReply.replyHandler(event, '請選擇您需要預約的時間' )
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