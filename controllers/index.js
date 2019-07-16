const autoReply = require('../utils/replyHandler')
const templates = require('../utils/templates')
const configs = require('../configs')
const appoitnmentController = require('./appointmentController')
const rp = require('request-promise')
const socket = require('socket.io-client')('http://35.194.253.53:3000')

/* To differentiate user's appointment time
using haspMap to store UserID, date and time */
function ApptChart(){

}
var appointmentSheet = {}
var profile, inSession;
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
                        profile = await appoitnmentController.startSession(event)
                        if(!profile){
                            break;
                        }
                        if(inSession){
                            autoReply.replyHandler(event, '系統提醒: 您正在諮商中')
                            break;
                        }
                        inSession = profile
                        socket.emit('sessionStart', inSession)
                        //30秒提醒結束, 測試
                        setTimeout(reminder, 1000 * 30)
                        //一分鐘結束諮商 無法傳送訊息到web端
                        setTimeout(endSession, 1000 * 60)
                        console.log(inSession.userID + ' 開始諮商')
                        return;
                case '結束諮商':
                        inSession = null
                        return;
            }
        break;
    }
    if(!inSession){
        return
    }
    if(inSession.userID === event.source.userId){
        console.log(inSession.userID)
        data = {name : inSession.name,
                userId : inSession.userID,
                message: event.message.text}
       
        //TODO Server API to send Message to web chatroom
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
                let confirmTemplate = templates.confirmTemplate(
                    appointmentSheet[userID].date,
                    appointmentSheet[userID].time)
                autoReply.replyHandler(event, confirmTemplate)
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
                    appointmentSheet[userID].time )
                break
        case 'cancel':
                console.log('Cancel')
                appointmentSheet[userID].date = ''
                appointmentSheet[userID].time = ''
                autoReply.replyHandler(event, '已結束預約流程')
                break
    }
}

function endSession () {
    //autoReply.destinedMessage('您的諮商時間已結束, 謝謝', inSession.userID)
    socket.emit('endSessionNotice', inSession)
    inSession = null
}

function reminder(){
    socket.emit('endSessionReminder', '諮商時間還有十分鐘')
    //autoReply.destinedMessage('系統提醒: 您的諮商時間還有十分鐘, 謝謝', inSession.userID)
}




module.exports = {
    commandHandler,
    postbackHandler

}