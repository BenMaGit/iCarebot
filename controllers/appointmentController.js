const Appointment = require('../models/appointment')
const Profile = require('../models/profile')
const autoReply = require('../utils/replyHandler')
const timeChecker = require('../utils/timeChecker')



const confirmAppointment = async (event, date, time) =>{
     //無預約時間
     if(!date|| !time){
        autoReply.replyHandler(event, '請選擇您預約的時間' )
        return
    }
    //預約以前的時間
    if((timeChecker.isToday(new Date(date)) && timeChecker.isPassedTime(parseInt(time.split(':')[0], 10) * 60)) || timeChecker.isPassed(new Date(date))){
        console.log("預約時間不符")
        autoReply.replyHandler(event, '您選擇的時間已過, 請重新選擇一個時間' )
        return
    }
    let userId = event.source.userId
    let profile = await Profile.lookUp(userId)
    let existingAppt = await Appointment.find().findByID(userId)
    console.log(existingAppt+ " Array is HERE")
    //移除之前的預約記錄
    for(let i = 0; i < existingAppt.length; i++){
        console.log(existingAppt[i].date + " DATE IS HERE")
        if(!timeChecker.isPassed(new Date(existingAppt[i].date))){
            await existingAppt[i].remove()
        }

    }
    if(!timeChecker.isPassed(new Date(existingAppt.date))){
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
    if(!timeChecker.isToday(apptDate) || !timeChecker.inTime(sessionStart, sessionEnd)){
        autoReply.replyHandler(event, '現在不是您預約的時段\n'+'您的預約時段是: \n' + appointment.date + ' ' + appointment.time)
        return
    }
    let profile = await Profile.lookUp(event.source.userId)
    
    return profile
        
}


module.exports = {
    confirmAppointment,
    lookUpAppointment,
    startSession

}