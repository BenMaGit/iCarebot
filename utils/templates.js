const Appointment = require('../models/appointment')

function appointmentTemplate (){
    let nextNineDays = generateNextWeek()
    let template = {
        "type": "template",
        "altText": "this is a carousel template",
        "template": {
          "type": "carousel",
          "actions": [],
          "columns": [
            {
              "title": "線上預約",
              "text": "選擇下列日期 \n一次只能預約一個時段\n原有預約記錄會被刪除",
              "actions": [
                {
                  "type": "postback",
                  "label": nextNineDays[0],
                  "text": "選擇"+nextNineDays[0],
                  "data": "選擇日期 " + nextNineDays[0]
                },
                {
                  "type": "postback",
                  "label": nextNineDays[1],
                  "text": "選擇"+nextNineDays[1],
                  "data": "選擇日期 " + nextNineDays[1]
                },
                {
                  "type": "postback",
                  "label": nextNineDays[2],
                  "text": "選擇"+nextNineDays[2],
                  "data": "選擇日期 " + nextNineDays[2]
                }
              ]
            },
            {
              "title": "線上預約",
              "text": "選擇下列日期 \n一次只能預約一個時段\n原有預約記錄會被刪除",
              "actions": [
                {
                  "type": "postback",
                  "label": nextNineDays[3],
                  "text": "選擇"+nextNineDays[3],
                  "data": "選擇日期 " + nextNineDays[3]
                },
                {
                  "type": "postback",
                  "label": nextNineDays[4],
                  "text": "選擇"+nextNineDays[4],
                  "data": "選擇日期 " + nextNineDays[4]
                },
                {
                  "type": "postback",
                  "label": nextNineDays[5],
                  "text": "選擇"+nextNineDays[5],
                  "data": "選擇日期 " + nextNineDays[5]
                }
              ]
            },
            {
                "title": "線上預約",
                "text": "選擇下列日期 \n一次只能預約一個時段\n原有預約記錄會被刪除",
                "actions": [
                  {
                    "type": "postback",
                    "label": nextNineDays[6],
                    "text": "選擇"+nextNineDays[6],
                    "data": "選擇日期 " + nextNineDays[6]
                  },
                  {
                    "type": "postback",
                    "label": nextNineDays[7],
                    "text": "選擇"+nextNineDays[7],
                    "data": "選擇日期 " + nextNineDays[7]
                  },
                  {
                    "type": "postback",
                    "label": nextNineDays[8],
                    "text": "選擇"+nextNineDays[8],
                    "data": "選擇日期 " + nextNineDays[8]
                  },
                ]
            },
            {
              "title": "線上預約",
              "text": "選擇下列日期 \n一次只能預約一個時段\n原有預約記錄會被刪除",
              "actions": [
                {
                  "type": "postback",
                  "label": nextNineDays[9],
                  "text": "選擇"+nextNineDays[9],
                  "data": "選擇日期 " + nextNineDays[9]
                },
                {
                  "type": "postback",
                  "label": nextNineDays[10],
                  "text": "選擇"+nextNineDays[10],
                  "data": "選擇日期 " + nextNineDays[10]
                },
                {
                  "type": "postback",
                  "label": nextNineDays[11],
                  "text": "選擇"+nextNineDays[11],
                  "data": "選擇日期 " + nextNineDays[11]
                },
              ]
          }
          ]
        }
      }
      return template
}
const generateAvailableTimeSlot = async (date) =>{
  let schedule =['9:00AM', '10:00AM', '11:00AM', '13:00PM', '14:00PM', '15:00PM']
  let bookedSlot =[]
  let actionArray = []
  let columnArray = []
  let appointmentDate = await Appointment.find().byDate(date)
  for(let j = 0; j < appointmentDate.length; j++){
      bookedSlot.push(appointmentDate[j].time)
  }
  //如果時段已滿
  if(bookedSlot.length == 5){
      return
  }
  for(let i = 0; i < schedule.length; i ++){
      if(bookedSlot.includes(schedule[i])){
          continue
      }
      let actionLength = actionArray.push(timeActionTemplate(schedule[i]))
      //console.log(JSON.stringify(template.timeActionTemplate(schedule[i])))
      //一個 actionTemplate 只會有三個actions
      if(actionLength == 3){
          columnArray.push(timeColumnTemplate(actionArray))
          console.log(JSON.stringify(timeColumnTemplate(actionArray)))
          actionArray = []
      }
  }
  //補滿actions 
  while(actionArray.length < 3 && actionArray.length != 0){
      actionArray.push(timeActionTemplate('-'))
  }
  //console.log(JSON.stringify(actionArray))
  //需要一個新的column 
  if(actionArray.length == 3){
      columnArray.push(timeColumnTemplate(actionArray))
  }
  let carouselTemplate = new timeTemplate(columnArray)
  return carouselTemplate
}

function timeActionTemplate (time){
    let template = {
      "type": "postback",
      "label": time,
      "text": "選擇 "+ time,
      "data": "選擇時間 "+ time
    }
    return template
}
function timeColumnTemplate (actionTemplates){
    let template = {
      "title": "線上預約",
      "text": "選擇下列時間",
      "actions":actionTemplates
    }
    return template
}
function timeTemplate(columns){
  let template = {
    "type": "template",
    "altText": "this is a carousel template",
    "template": {
      "type": "carousel",
      "actions": [],
      "columns": columns
    }
  }
  return template
}
function confirmTemplate (date, time) {

  let template = {
    "type": "template",
    "altText": "this is a buttons template",
    "template": {
      "type": "buttons",
      "actions": [
        {
          "type": "postback",
          "label": "確認",
          "data": "confirm"
        },
        {
          "type": "postback",
          "label": "取消",
          "data": "cancel"
        }
      ],
      "title": "請確認以下的日期與時間",
      "text": "您選擇了 "+ date + " " + time + "時段"
    }
  }
  return template

}



function generateNextWeek(){
    let j = 12
    let dateArray = []
    for(let i = 0; i < j; i++){
        let date = new Date()
        date.setDate(date.getDate() + i)
        if(date.getDay() === 6 || date.getDay() === 0){
            j += 1
            continue;
        }
        dateArray.push(date.toLocaleDateString())
    }
    return dateArray
}
function cancelationTemplate(appointment){
  let template = {
    "type": "template",
    "altText": "this is a buttons template",
    "template": {
      "type": "buttons",
      "actions": [
        {
          "type": "message",
          "label": "取消預約",
          "text": "取消預約"
        }
      ],
      "title": "預約時間",
      "text": appointment.date+' '+appointment.time
    }
  }
  return template
  
}

module.exports = {
    appointmentTemplate,
    timeTemplate,
    confirmTemplate,
    timeActionTemplate,
    timeColumnTemplate,
    generateAvailableTimeSlot,
    cancelationTemplate
}
