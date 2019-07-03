const linebot = require('linebot');
const express = require('express');
const mongoose = require('mongoose')
const controllers = require('./controllers')
const configs = require('./configs')

const bot = linebot(configs.botAccess);


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
    controllers.postbackHandler(event)

})

const app = express();
const linebotParser = bot.parser();
app.get('/test', (req, res)=>{
    res.json({status:'it works!'})
})
app.post('/', linebotParser);

mongoose.connect(configs.mongodb).then(() =>{
    var server = app.listen(process.env.PORT || 8080, function() {
        var port = server.address().port;
        console.log("App now running on port", port);
    
        
    });
})



