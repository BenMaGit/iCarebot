const autoReply = require('../utils/replyHandler')
const templates = require('../utils/templates')
const configs = require('../configs')
const appoitnmentController = require('./appointmentController')
const rp = require('request-promise')
const socket = require('../index')

/* To differentiate user's appointment time
using haspMap to store UserID, date and time */
function ApptChart(){

}
var appointmentSheet = {}
var profile;
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
                        console.log(profile.userID + ' 開始諮商')
                        break;
                case '結束諮商':
                        profile = null
                        return;
            }
        break;
    }
    if(!profile){
        return
    }
    if(profile.userID === event.source.userId){
        console.log(profile.userID)
        socket.emit('lineSent', event.message.text)
        //TODO Server API to send Message to web chatroom
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




module.exports = {
    commandHandler,
    postbackHandler

}