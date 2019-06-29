
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
              "text": "選擇下列日期",
              "actions": [
                {
                  "type": "postback",
                  "label": nextNineDays[0],
                  "text": "選擇"+nextNineDays[0],
                  "data": nextNineDays[0]
                },
                {
                  "type": "postback",
                  "label": nextNineDays[1],
                  "text": "選擇"+nextNineDays[1],
                  "data": nextNineDays[1]
                },
                {
                  "type": "postback",
                  "label": nextNineDays[2],
                  "text": "選擇"+nextNineDays[2],
                  "data": nextNineDays[2]
                }
              ]
            },
            {
              "title": "線上預約",
              "text": "選擇下列日期",
              "actions": [
                {
                  "type": "postback",
                  "label": nextNineDays[3],
                  "text": "選擇"+nextNineDays[3],
                  "data": nextNineDays[3]
                },
                {
                  "type": "postback",
                  "label": nextNineDays[4],
                  "text": "選擇"+nextNineDays[4],
                  "data": nextNineDays[4]
                },
                {
                  "type": "postback",
                  "label": nextNineDays[5],
                  "text": "選擇"+nextNineDays[5],
                  "data": nextNineDays[5]
                }
              ]
            },
            {
                "title": "線上預約",
                "text": "選擇下列日期",
                "actions": [
                  {
                    "type": "postback",
                    "label": nextNineDays[6],
                    "text": "選擇"+nextNineDays[6],
                    "data": nextNineDays[6]
                  },
                  {
                    "type": "postback",
                    "label": nextNineDays[7],
                    "text": "選擇"+nextNineDays[7],
                    "data": nextNineDays[7]
                  },
                  {
                    "type": "postback",
                    "label": nextNineDays[8],
                    "text": "選擇"+nextNineDays[8],
                    "data": nextNineDays[8]
                  }
                ]
            }
          ]
        }
      }
      return template
}

let timeTemplate = {
  "type": "template",
  "altText": "this is a carousel template",
  "template": {
    "type": "carousel",
    "actions": [],
    "columns": [
      {
        "title": "線上預約",
        "text": "選擇下列時間",
        "actions": [
          {
            "type": "postback",
            "label": "9:00 AM",
            "text": "選擇 9:00 AM",
            "data": "9:00 AM"
          },
          {
            "type": "postback",
            "label": "10:00 AM",
            "text": "選擇 10:00 AM",
            "data": "10:00 AM"
          },
          {
            "type": "postback",
            "label": "11:00 AM",
            "text": "選擇 11:00 AM",
            "data": "11:00 AM"
          }
        ]
      },
      {
        "title": "線上預約",
        "text": "選擇下列時間",
        "actions": [
          {
            "type": "postback",
            "label": "13:00 PM",
            "text": "選擇 13:00 PM",
            "data": "13:00 PM"
          },
          {
            "type": "postback",
            "label": "14:00 PM",
            "text": "選擇 14:00 PM",
            "data": "14:00 PM"
          },
          {
            "type": "postback",
            "label": "15:00 PM",
            "text": "選擇 15:00 PM",
            "data": "15:00 PM"
          }
        ]
      }
    ]
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
    timeTemplate
}