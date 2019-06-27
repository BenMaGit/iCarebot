const linebot = require('linebot');
const express = require('express')
const template = require('./templates')

const bot = linebot({
    channelId: '1591861988',
    channelSecret: '760b25e4be02883716fa8608803220d6',
    channelAccessToken: 'zr2GguG/HT18L9uoCoQkGoMXx8nVG4zXI4gFnRZEfMw5S1VRL0L8Lg4mwpNWEvZeirwXWMaItTHSCNIPVraMwxA4UCeLBqWJ4nf3G2AawST0rq4sJGA5JycW8CAVmzBQPaBeDUMudsGoGwIqCYtUowdB04t89/1O/w1cDnyilFU='
});

function autoReplyMessage(event, msg){
    if(event.message.text === '線上預約'){
        console.log("In appointment")
        let appointmentTemplate = template.appointmentTemplate
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
    bot,
    autoReplyMessage,
    destinedMessage
    
}