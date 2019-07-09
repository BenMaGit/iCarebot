const linebot = require('linebot');
const bot = linebot(configs.botAccess);

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