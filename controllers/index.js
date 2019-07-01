const autoReply = require('../utils/replyHandler')
const templates = require('../utils/templates')
const appoitnmentController = require('./appointmentController')
let date, time


function commandHandler(event){
    switch(event.message.type){
        case 'text':
            switch (event.message.text){
                case '線上預約':
                        console.log("In appointment")
                        let appointmentTemplate = templates.appointmentTemplate()
                        autoReply.replyHandler(event, appointmentTemplate)
                        break;
                default:
                        if(!event.message.text.startsWith('選擇')){
                            autoReply.replyHandler(event, 'Default Message')
                        }
                        break;
            }
            break;
    }
    
}
function postbackHandler(event){
    let action = event.postback.data.split(' ')
    switch (action[0]){
        case '選擇日期':
                console.log('Pick a time')
                let timeTemplate = templates.timeTemplate
                date = action[1]
                autoReply.replyHandler(event, timeTemplate)
                break;
        case '選擇時間':
                console.log('Please confirm action')
                let confirmTemplate = templates.confirmTemplate
                time = action[1]
                autoReply.replyHandler(event, confirmTemplate)
                break;
        case 'confirm':
                console.log('Confirm')
                appoitnmentController.confirmAppointment(event, date, time)
                break;
    }
}




module.exports = {
    commandHandler,
    postbackHandler

}