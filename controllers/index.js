const autoReply = require('../utils/replyHandler')
const templates = require('../utils/templates')
const ap

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
    switch (event.postback.data){
        case '選擇日期':
                console.log("Pick a time")
                let timeTemplate = templates.timeTemplate
                autoReply.replyHandler(event, timeTemplate)
                break;
        case '選擇時間':
                console.log("Please confirm actiom")
                let confirmTemplate = templates.confirmTemplate
                autoReply.replyHandler(event, confirmTemplate)


    }
}




module.exports = {
    commandHandler,
    postbackHandler

}