const linebot = require('linebot');
const express = require('express');
const mongoose = require('mongoose')
const controllers = require('./controllers')
const Appointment = require('./models/appointment')
const template = require('./utils/templates')

const bot = linebot({
    channelId: process.env.channelId,
    channelSecret: process.env.channelSecret,
    channelAccessToken: process.env.channelAccessToken
});


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

mongoose.connect(process.env.mongodb).then(() =>{
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
    console.log(obj.profile.userID +"got reminder")
    bot.push(obj.profile.userID, 'You have an appointment at ' + obj.time + ' later today')
})

socket.on('therapistChanged', async (data)=>{
    let date = data.time.split(' ')[0]
    let time = data.time.split(' ')[1]
    date = date.split('/')[1]+'/'+date.split('/')[2]+'/'+date.split('/')[0]
    if(parseInt(time.split(':')[0],10) < 12){
        time = time + 'AM'
    }else{
        time = time +' PM'
    }
    console.log(date+" "+time)
    let appointment = await Appointment.checkAvailableTime(date, time)
    console.log(appointment)
    await appointment.updateOne({therapist:data.sub})
    bot.push(appointment.profile.userID, "HELLO")
    console.log(appointment.profile.userID)
})
socket.on('broadcast', (message)=>{
    bot.broadcast(message)
})





