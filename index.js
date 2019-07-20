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

const socket = require('socket.io-client')('http://35.194.253.53:3000')
socket.on('connect', function(){
    console.log("Successfully connected to GCP")
})
socket.on('lineSent', (msg)=>{
    console.log(msg)
})

socket.on('webSent', (obj)=>{
    bot.push(obj.userId, obj.message)
})

socket.on('reminder', (obj)=>{
    console.log(obg.profile.userID +"got reminder")
    bot.push(obj.profile.userID, 'You have an appointment at ' + obj.time + ' later today')
})





