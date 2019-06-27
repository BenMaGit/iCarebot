let nextNineDays = generateNextWeek()
let appointmentTemplate = {
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
              "type": "message",
              "label": nextNineDays[0],
              "text": "選擇"+nextNineDays[0]
            },
            {
              "type": "message",
              "label": nextNineDays[1],
              "text": "選擇"+nextNineDays[1]
            },
            {
              "type": "message",
              "label": nextNineDays[2],
              "text": "選擇"+nextNineDays[2]
            }
          ]
        },
        {
          "title": "線上預約",
          "text": "選擇下列日期",
          "actions": [
            {
              "type": "message",
              "label": nextNineDays[3],
              "text": "選擇"+nextNineDays[3]
            },
            {
              "type": "message",
              "label": nextNineDays[4],
              "text": "選擇"+nextNineDays[4]
            },
            {
              "type": "message",
              "label": nextNineDays[5],
              "text": "選擇"+nextNineDays[5]
            }
          ]
        },
        {
            "title": "線上預約",
            "text": "選擇下列日期",
            "actions": [
              {
                "type": "message",
                "label": nextNineDays[6],
                "text": "選擇"+nextNineDays[6]
              },
              {
                "type": "message",
                "label": nextNineDays[7],
                "text": "選擇"+nextNineDays[7]
              },
              {
                "type": "message",
                "label": nextNineDays[8],
                "text": "選擇"+nextNineDays[8]
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

module.exports = {appointmentTemplate}