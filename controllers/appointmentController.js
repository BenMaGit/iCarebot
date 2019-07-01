const Appointment = require('../models/appointment')
const Profile = require('../models/profile')

const confirmAppointment = (event) =>{
    let appointment = new Appointment({
        profile: {
            "Name": "Subject one",
            "ID": "this is a buttons template"},
        date: "2019/06/25",
        time: "7:00 AM"

    })
    appointment.save().then(()=>{
        event.reply('Confrim Appointment')

    })
}

module.exports = {
    confirmAppointment

}