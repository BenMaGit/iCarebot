const linebot = require('linebot');
const express = require('express');
const controllers = require('./controllers')

const bot = linebot({
    channelId: '1591861988',
    channelSecret: '760b25e4be02883716fa8608803220d6',
    channelAccessToken: 'zr2GguG/HT18L9uoCoQkGoMXx8nVG4zXI4gFnRZEfMw5S1VRL0L8Lg4mwpNWEvZeirwXWMaItTHSCNIPVraMwxA4UCeLBqWJ4nf3G2AawST0rq4sJGA5JycW8CAVmzBQPaBeDUMudsGoGwIqCYtUowdB04t89/1O/w1cDnyilFU='
});

const replyHandler = require('./utils/replyHandler')


bot.on('message', function (event) {
    console.log(event)
    controllers.commandHandler(event)
   /*  if(event.message.type === 'text'){
        replyHandler.autoReplyMessage(event, "Default Message")
    } */
    
   /*  bot.push('U409fc59adb88b8b4c961b45674ce6ca1', event.message.text).then(function (data) {
    }).catch(function (error) {
    });
        event.reply(event.message.text).then(function (data) {
    }).catch(function (error) {
    }); */
  });
bot.on('postback', function (event) {
    console.log(event)

})

const app = express();
const linebotParser = bot.parser();
app.post('/', linebotParser);

var server = app.listen(process.env.PORT || 8080, function() {
    var port = server.address().port;
    console.log("App now running on port", port);

    
});


