const Appointment = require('../models/appointment')
const Profile = require('../models/profile')
const autoReply = require('../utils/replyHandler')

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



module.exports = {
    confirmAppointment

}