
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
                  }
                ]
            }
          ]
        }
      }
      return template
}

const timeActionTemplate = function (time) {
  let template = {
    "type": "postback",
    "label": time,
    "text": "選擇 "+ time,
    "data": "選擇時間"+ time
  }
  return template
}
const timeColumnTemplate = function (actionTemplates){
  let template = {
    "title": "線上預約",
    "text": "選擇下列時間",
    "actions":actionTemplates
  }
  return template
}
const timeTemplate = function (columns){
  let template = {
    "type": "template",
    "altText": "this is a carousel template",
    "template": {
      "type": "carousel",
      "actions": [],
      "columns": columns
    }
  }
}
const confirmTemplate = {
  "type": "template",
  "altText": "this is a buttons template",
  "template": {
    "type": "buttons",
    "actions": [
      {
        "type": "postback",
        "label": "確認",
        "text": "確認預約",
        "data": "confirm"
      },
      {
        "type": "postback",
        "label": "取消",
        "text": "取消預約",
        "data": "cancel"
      }
    ],
    "title": "確認預約",
    "text": "日期"
  }
}

function generateNextWeek(){
    let j = 9
    let dateArray = []
    for(let i = 1; i <= j; i++){
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

module.exports = {
    appointmentTemplate,
    timeTemplate,
    confirmTemplate,
    timeActionTemplate,
    timeColumnTemplate
}
