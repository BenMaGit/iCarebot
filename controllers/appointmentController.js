const Appointment = require('../models/appointment')
const Profile = require('../models/profile')
const autoReply = require('../utils/replyHandler')



const confirmAppointment = async (event, date, time) =>{
    let userId = event.source.userId
    let profile = await Profile.lookUp(userId)
   
    let existingAppt = await Appointment.findByID(userId)
    //無預約時間
    if(!date|| !time){
        autoReply.replyHandler(event, '請選擇您預約的時間' )
        return
    }
    
    //移除之前的預約記錄
    if(existingAppt){
        await existingAppt.remove()
    }
    //檢查這個時段有沒有被預約
    let timeSlot = await Appointment.checkAvailableTime(date, time)
    
    if(!timeSlot){
        //檢查資料庫有沒有個案資料
        if(!profile){
            autoReply.replyHandler(event, '請到下列網址驗證您的學生身份'+'\n'+'http://35.194.223.224/register?linkToken='+userId+"&date="+encodeURIComponent(date)+"&time="+encodeURIComponent(time))
            return
        }
        console.log('Creating Appointment')
        let appointment = new Appointment({
            profile: profile,
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
    let appointment = await Appointment.findByID(event.source.userId)
    if(!appointment){
        autoReply.replyHandler(event, '您沒有任何預約')
    }else{
        autoReply.replyHandler(event, '您預約的時段是: ' + appointment.date + ' ' + appointment.time)
    } 
}

const startSession = async(event) =>{
    let appointment = await Appointment.findByID(event.source.userId)
    if(!appointment){
        autoReply.replyHandler(event, '您沒有任何預約')
        return
    }
    let apptDate = new Date(appointment.date)
    let apptTime = parseInt(appointment.time.split(':')[0], 10)
    let sessionStart = apptTime * 60
    let sessionEnd = (apptTime + 1) * 60
    if(!isToday(apptDate) || !inTime(sessionStart, sessionEnd)){
        autoReply.replyHandler(event, '現在不是您預約的時段\n'+'您的預約時段是: \n' + appointment.date + ' ' + appointment.time)
        return
    }
    userId = event.source.userId
    autoReply.replyHandler(event, '已幫您與諮商師進行連接')
    return userId
}


//check date
const isToday = (someDate) => {
    const today = new Date()
    return someDate.getDate() == today.getDate() &&
      someDate.getMonth() == today.getMonth() &&
      someDate.getFullYear() == today.getFullYear()
}
//check time
function inTime(start, end) {
    var now = new Date();
    var time = now.getHours() * 60 + now.getMinutes();
    console.log(time + " NOW")
    return time >= start && time < end;
}



module.exports = {
    confirmAppointment,
    lookUpAppointment,
    startSession

}