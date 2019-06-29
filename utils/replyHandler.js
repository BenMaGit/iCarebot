function replyHandler(event, msg){
    return event.reply(msg)
}

function destinedMessage(event, msg, userID){
    bot.push(userID, msg).then(function (data) {

    }).catch(function (error) {
        console.log(error)
    });
}
module.exports = {
    replyHandler  
}