const autoReply = require('../utils/replyHandler')
const templates = require('../utils/templates')

function commandHandler(event){
    if(event.message.type === 'text'){
        switch (event.message.text){
            case '線上預約':
                    console.log("In appointment")
                    let appointmentTemplate = templates.appointmentTemplate()
                    autoReply.replyHandler(event, appointmentTemplate)
                    break;
            default:
                    autoReply.replyHandler(event, 'Default Message')

        }
    }
}



module.exports = {commandHandler}