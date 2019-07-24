
const linebot = require('linebot');
const bot = linebot({
    channelId: process.env.channelId,
    channelSecret: process.env.channelSecret,
    channelAccessToken: process.env.channelAccessToken
});

function replyHandler(event, msg){
    return event.reply(msg)
}

function destinedMessage(msg, userID){
    bot.push(userID, msg).then(function (data) {

    }).catch(function (error) {
        console.log(error)
    });
}
module.exports = {
    replyHandler,
    destinedMessage
}