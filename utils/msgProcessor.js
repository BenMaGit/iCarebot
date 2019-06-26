const linebot = require('linebot');
const express = require('express')

const bot = linebot({
    channelId: '1591861988',
    channelSecret: '760b25e4be02883716fa8608803220d6',
    channelAccessToken: 'zr2GguG/HT18L9uoCoQkGoMXx8nVG4zXI4gFnRZEfMw5S1VRL0L8Lg4mwpNWEvZeirwXWMaItTHSCNIPVraMwxA4UCeLBqWJ4nf3G2AawST0rq4sJGA5JycW8CAVmzBQPaBeDUMudsGoGwIqCYtUowdB04t89/1O/w1cDnyilFU='
});

function autoReplyMessage(event, msg){
    event.reply(msg).then(function (data) {

    }).catch(function (error) {

    });
  
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