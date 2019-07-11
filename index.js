const linebot = require('linebot');
const express = require('express');
const mongoose = require('mongoose')
const controllers = require('./controllers')
const configs = require('./configs')

const bot = linebot(configs.botAccess);


// linebot listening event
bot.on('message', function (event) {
    console.log(event)
    controllers.commandHandler(event)
  });
bot.on('postback', function (event) {
    controllers.postbackHandler(event)

})

const app = express();
const linebotParser = bot.parser();

app.post('/', linebotParser);

mongoose.connect(configs.mongodb).then(() =>{
    var server = app.listen(process.env.PORT || 8080, function() {
        var port = server.address().port;
        console.log("App now running on port", port);
    
        
    });
})

const socket = require('socket.io-client')('http://35.194.223.224:3000')
socket.on('connect', function(){
    console.log("Successfuly connected to GCP")
})
socket.on('webSent', (obj)=>{
    bot.push(obj.userId, obj.message)
})



