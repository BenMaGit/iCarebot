const template = require('./templates')

function autoReplyMessage(event, msg){
    console.log(event)
    if(event.message.text === '線上預約'){
        console.log("In appointment")
        let appointmentTemplate = template.appointmentTemplate()
          event.reply(appointmentTemplate).then(function (data) {

        }).catch(function (error) {
    
        });
       
    }else{
        console.log("Not in appointment")
        event.reply(msg).then(function (data) {

        }).catch(function (error) {
    
        });
    }
  
};
function destinedMessage(event, msg, userID){
    bot.push(userID, msg).then(function (data) {

    }).catch(function (error) {
        console.log(error)
    });
}
module.exports = {
    autoReplyMessage,
    destinedMessage
    
}