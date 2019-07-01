const Appointment = require('../models/appointment')
const Profile = require('../models/profile')

const confirmAppointment = async (event, date, time) =>{
    let timeSlot = await Appointment.checkAvailableTime(date, time)
    if(!timeSlot){
        let appointment = new Appointment({
            profile: {
                "Name": "Subject one",
                "ID": "This is userID"},
            date: date,
            time: time
    
        })
        appointment.save().then(()=>{
            event.reply('預約成功!')
    
        })
    }else{
        event.reply('已有人預約這個時段')
    }
    
}



module.exports = {
    confirmAppointment

}