const linebot = require('linebot');
const express = require('express')

const handler = require('./utils/handler')

handler.bot.on('message', function (event) {
    console.log(event)
    if(event.message.type === 'text'){
        handler.autoReplyMessage(event, "Some other message!")
    }
    
   /*  bot.push('U409fc59adb88b8b4c961b45674ce6ca1', event.message.text).then(function (data) {
    }).catch(function (error) {
    });
        event.reply(event.message.text).then(function (data) {
    }).catch(function (error) {
    }); */
  });

const app = express();
const linebotParser = handler.bot.parser();
app.post('/', linebotParser);

var server = app.listen(process.env.PORT || 8080, function() {
    var port = server.address().port;
    console.log("App now running on port", port);
    
});


