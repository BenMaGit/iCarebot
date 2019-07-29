const autoReply = require('../utils/replyHandler')
const templates = require('../utils/templates')
const appoitnmentController = require('./appointmentController')

const socket = require('socket.io-client')('http://35.194.253.53:3000')

/* To differentiate user's appointment time
using haspMap to store UserID, date and time */
function ApptChart(){

}
var appointmentSheet = {}
var inSession, therapist;
async function commandHandler(event){
    switch(event.message.type){
        case 'text':
            switch (event.message.text){
                case '線上預約':
                        console.log('In appointment')
                        let appointmentTemplate = templates.appointmentTemplate()
                        appointmentSheet[event.source.userId] = new ApptChart()
                        autoReply.replyHandler(event, appointmentTemplate)
                        break;
                case '預約查詢':
                        console.log('Look up appointment')
                        appoitnmentController.lookUpAppointment(event)
                        break;
                case '常見問題':
                        console.log('Frequently Asked Question')
                        break;
                case '開始諮商':
                        if(inSession){
                            console.log('Already in Session')
                            autoReply.replyHandler(event, '正在諮商中')
                            return
                        }
                        appointment = await appoitnmentController.startSession(event)
                        if(!appointment){
                            break;
                        }
                        
                        inSession = appointment.profile
                        therapist = appointment.therapist
                        //計算剩餘時間
                        let sessionTime = calSessionTime(appointment)
                        let obj = {
                            appointment: appointment,
                            timeLeft: sessionTime
                        }
                        //發送sessionStart 給web端
                        socket.emit('sessionStart', obj)
                        //時間過一半會提醒
                        setTimeout(reminder.bind(null, sessionTime), sessionTime/2)
                        //結束諮商 無法傳送訊息到web端
                        setTimeout(endSession, sessionTime)
                        autoReply.replyHandler(event, '已幫您與諮商師進行連接')
                        console.log(inSession.userID + ' 開始諮商')
                        return;
                case '結束諮商':
                        inSession = null
                        return;
                case '取消預約':
                        appoitnmentController.cancelAppointment(event)
                        return     
            }
            break;
    }
    if(!inSession){
        return
    }
    if(inSession.userID === event.source.userId){
        console.log(inSession.userID)
        console.log(therapist)
        data = {name : inSession.name,
                userId : inSession.userID,
                message : event.message.text,
                therapist : therapist
                }
       
        //TODO Determine which therapist should receive the message
        socket.emit('lineSent', data)
/*         var options = {
            method: 'POST',
            uri: 'http://35.194.253.53:3000/lineSend',
            body: {
                name : profile.name,
                userId : profile.userID,
                message: event.message.text
            },
            json: true 
        };
        rp(options).then(function (res) {
            // POST succeeded...
            console.log(res.msg)
        })
        .catch(function (err) {
            // POST failed...
        }); */
    } 
}
async function postbackHandler(event){
    let action = event.postback.data.split(' ')
    let userID = event.source.userId
    if(!appointmentSheet[userID]){
        appointmentSheet[event.source.userId] = new ApptChart()
    }
    switch (action[0]){
        case '選擇日期':
                console.log('Pick a time on ' + action[1])
                let timeTemplate = await templates.generateAvailableTimeSlot(action[1])
                if(!timeTemplate){
                    autoReply.replyHandler(event, "該日期時段已滿")
                    break
                }
                appointmentSheet[userID].date = action[1]
                autoReply.replyHandler(event, timeTemplate)
                break;
        case '選擇時間':
                console.log('Please confirm action')
                if(action[1] == '-'){
                    break
                }
                appointmentSheet[userID].time = action[1]
                if(!appointmentSheet[userID].date){
                    autoReply.replyHandler(event, '請選擇日期')
                }
                autoReply.replyHandler(event, templates.topicTemplate())
                break
        case 'confirm':
                console.log('Confirm')
                if(!appointmentSheet[userID]){
                    autoReply.replyHandler(event, '請重新選擇預約時間')
                    break
                }
                appoitnmentController.confirmAppointment(
                    event, 
                    appointmentSheet[userID].date, 
                    appointmentSheet[userID].time,
                    appointmentSheet[userID].topic )
                break
        case 'cancel':
                console.log('Cancel')
                appointmentSheet[userID].date = ''
                appointmentSheet[userID].time = ''
                autoReply.replyHandler(event, '已結束預約流程')
                break
        case 'Topics':
                let confirmTemplate = templates.confirmTemplate(
                    appointmentSheet[userID].date,
                    appointmentSheet[userID].time)
                appointmentSheet[userID].topic = action[1]
                autoReply.replyHandler(event, confirmTemplate)
                break
                    
    }
}

function endSession () {
    autoReply.destinedMessage('您的諮商時間已結束, 謝謝', inSession.userID)
    socket.emit('endSessionNotice', inSession)
    inSession = null
}

function reminder(sessionTime, therapist){
    let time = new Date(sessionTime).getMinutes()
    let obj = {
        message:'諮商時間還有'+time/2+'分鐘',
        therapist: therapist
    }
    socket.emit('endSessionReminder', obj)
    autoReply.destinedMessage('系統提醒: 您的諮商時間還有'+ time/2 + '分鐘, 謝謝', inSession.userID)
}

function calSessionTime(appointment){
    let sessionStart = new Date().getTime()
    let apptDate = new Date(appointment.date).getTime()
    console.log(apptDate + ' appointment Date')
    console.log(appointment.time + ' appointment time')
    let apptTime = parseInt(appointment.time.split(':')[0], 10)
    let sessionEnd = apptDate + ((apptTime + 1) * 60 - 10) * 60 * 1000 //五十分鐘諮商時間
    console.log((sessionEnd - sessionStart)/2+ " reminder time")
    console.log(sessionEnd - sessionStart+ " remaining time")
    return sessionEnd - sessionStart
}




module.exports = {
    commandHandler,
    postbackHandler

}