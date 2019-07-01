const Appointment = require('../models/appointment')
const Profile = require('../models/profile')

const confirmAppointment = (event, date, time) =>{
    let appointment = new Appointment({
        profile: {
            "Name": "Subject one",
            "ID": "this is a buttons template"},
        date: date,
        time: time

    })
    appointment.save().then(()=>{
        event.reply('預約成功!')

    })
}

module.exports = {
    confirmAppointment

}