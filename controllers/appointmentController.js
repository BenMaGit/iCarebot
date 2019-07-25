const Appointment = require('../models/appointment')
const Profile = require('../models/profile')
const autoReply = require('../utils/replyHandler')
const timeChecker = require('../utils/timeChecker')
const template = require('../utils/templates')



const confirmAppointment = async (event, date, time, topic) =>{
     //無預約時間
     if(!date|| !time){
        autoReply.replyHandler(event, '請選擇您預約的時間' )
        return
    }
    //預約以前的時間
    if(timeChecker.isPassed(date, parseInt(time.split(':')[0]))){
        console.log("預約時間不符")
        autoReply.replyHandler(event, '您選擇的時間已過, 請重新選擇一個時間' )
        return
    }
    /* if((timeChecker.isToday(new Date(date)) && timeChecker.isPassedTime(parseInt(time.split(':')[0], 10) * 60)) || timeChecker.isPassed(new Date(date))){
        console.log("預約時間不符")
        autoReply.replyHandler(event, '您選擇的時間已過, 請重新選擇一個時間' )
        return
    } */
    let userId = event.source.userId
    let profile = await Profile.lookUp(userId)
    let existingAppt = await Appointment.find().byId(userId)
    //移除預約記錄避免重複預約
    for(let i = 0; i < existingAppt.length; i++){
        if(!timeChecker.isPassed(existingAppt[i].date, parseInt(existingAppt[i].time.split(':')[0]))){
            await existingAppt[i].remove()
        }
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
            time: time,
            topic: topic
        })
        appointment.save().then(()=>{
            autoReply.replyHandler(event, '預約成功!' )
    
        })
    }else{
        autoReply.replyHandler(event, '已有人預約這個時段' )
    }
    
    
}

const lookUpAppointment = async (event) =>{
    let appointment = await Appointment.findLatest(event.source.userId)
    if(!appointment){
        autoReply.replyHandler(event, '您沒有任何預約')
    }else if (timeChecker.isPassed(appointment.date, parseInt(appointment.time.split(':')[0]))){
        autoReply.replyHandler(event, '您在接下來兩星期沒有任何預約時段,\n 您最近一次的預約是:\n' + appointment.date +' '+ appointment.time)
    }else{
        autoReply.replyHandler(event, template.cancelationTemplate(appointment))
    }
}

const startSession = async(event) =>{
    let appointment = await Appointment.findLatest(event.source.userId)
    if(!appointment){
        autoReply.replyHandler(event, '您沒有任何預約')
        return
    }
    let apptDate = new Date(appointment.date)
    let apptTime = parseInt(appointment.time.split(':')[0], 10)
    let sessionStart = apptTime * 60
    let isLate = sessionStart + 10 //超過預約十分鐘 遲到
    let sessionEnd = (apptTime + 1) * 60 - 10  //五十分結束
    if(!timeChecker.isToday(apptDate) || !timeChecker.inTime(sessionStart, sessionEnd)){
        autoReply.replyHandler(event, '現在不是您預約的時段\n'+'您的預約時段是: \n' + appointment.date + ' ' + appointment.time)
        return
    }else if (!timeChecker.inTime(sessionStart, isLate)){
        autoReply.replyHandler(event, '您已經遲到了十分鐘以上\n'+'您的預約時段是: \n' + appointment.date + ' ' + appointment.time +'\n請重新預約')
        return
    }
    
    return appointment
        
}

const cancelAppointment = async(event) =>{
    let appointment = await Appointment.findLatest(event.source.userId)
    if(!appointment || timeChecker.isPassed(appointment.date, parseInt(appointment.time.split(':')[0]))){
        autoReply.replyHandler(event, '您沒有任何預約可以取消')
    }else{
        await appointment.remove()
        autoReply.replyHandler(event, '您取消了在: ' + appointment.date + ' ' + appointment.time+' 的預約')
    } 

}


module.exports = {
    confirmAppointment,
    lookUpAppointment,
    startSession,
    cancelAppointment

}