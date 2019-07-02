const autoReply = require('../utils/replyHandler')
const templates = require('../utils/templates')
const appoitnmentController = require('./appointmentController')

/* To differentiate user's appointment time
using haspMap to store UserID, date and time */
function ApptChart(){

}
var appointmentSheet = {}

function commandHandler(event){
    switch(event.message.type){
        case 'text':
            switch (event.message.text){
                case '線上預約':
                        console.log("In appointment")
                        let appointmentTemplate = templates.appointmentTemplate()
                        appointmentSheet[event.source.userId] = new ApptChart()
                        autoReply.replyHandler(event, appointmentTemplate)
                        break;
                case '預約查詢':
                        console.log("Look up appointment")
                        appoitnmentController.lookUpAppointment(event)
                        break;
                default:
                        /* if(!event.message.text.startsWith('選擇')){
                            autoReply.replyHandler(event, 'Default Message')
                        }
                        break; */
            }
        break;
    } 
}
async function postbackHandler(event){
    let action = event.postback.data.split(' ')
    switch (action[0]){
        case '選擇日期':
                console.log('Pick a time on ' + action[1])
                let timeTemplate = await appoitnmentController.generateAvailableTimeSlot(action[1])
                console.log(JSON.stringify(timeTemplate))
                console.log("My Carousel Template")
                appointmentSheet[event.source.userId].date = action[1]
                autoReply.replyHandler(event, "testing")
                break;
        case '選擇時間':
                console.log('Please confirm action')
                let confirmTemplate = templates.confirmTemplate
                appointmentSheet[event.source.userId].time = action[1]
                autoReply.replyHandler(event, confirmTemplate)
                break;
        case 'confirm':
                console.log('Confirm')
                appoitnmentController.confirmAppointment(
                    event, 
                    appointmentSheet[event.source.userId].date, 
                    appointmentSheet[event.source.userId].time )
                break;
    }
}




module.exports = {
    commandHandler,
    postbackHandler

}