const linebot = require('linebot');
const express = require('express')

const bot = linebot({
    channelId: '1591861988',
    channelSecret: '760b25e4be02883716fa8608803220d6',
    channelAccessToken: 'zr2GguG/HT18L9uoCoQkGoMXx8nVG4zXI4gFnRZEfMw5S1VRL0L8Lg4mwpNWEvZeirwXWMaItTHSCNIPVraMwxA4UCeLBqWJ4nf3G2AawST0rq4sJGA5JycW8CAVmzBQPaBeDUMudsGoGwIqCYtUowdB04t89/1O/w1cDnyilFU='
});

function autoReplyMessage(event, msg){
    if(event.message.text == '線上預約'){
        let appointmentTemplate = TemplateSendMessage({
            "type": "template",
            "altText": "this is a carousel template",
            "template": {
              "type": "carousel",
              "actions": [],
              "columns": [
                {
                  "thumbnailImageUrl": "SPECIFY_YOUR_IMAGE_URL",
                  "title": "線上預約",
                  "text": "選擇下列時間",
                  "actions": [
                    {
                      "type": "message",
                      "label": "7:30AM",
                      "text": "選擇 7:30 AM"
                    },
                    {
                      "type": "message",
                      "label": "8:30AM",
                      "text": "選擇 8:30 AM"
                    }
                  ]
                },
                {
                  "thumbnailImageUrl": "SPECIFY_YOUR_IMAGE_URL",
                  "title": "線上預約",
                  "text": "選擇下列時間",
                  "actions": [
                    {
                      "type": "message",
                      "label": "9:30AM",
                      "text": "選擇 9:30 AM"
                    },
                    {
                      "type": "message",
                      "label": "10:30AM",
                      "text": "選擇 10:30 AM"
                    }
                  ]
                }
              ]
            }
          })
          bot.reply(event.replyToken, appointmentTemplate)
       
    }else{
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