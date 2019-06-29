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
                    if(!event.message.text.startsWith('選擇')){
                        autoReply.replyHandler(event, 'Default Message')
                    }

        }
    }else if (event.type === 'postback'){
        
    }
}




module.exports = {commandHandler}