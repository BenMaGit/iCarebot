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
              "label": generateNextWeek[0],
              "text": "選擇"+generateNextWeek[0]
            },
            {
              "type": "message",
              "label": generateNextWeek[1],
              "text": "選擇"+generateNextWeek[1]
            },
            {
              "type": "message",
              "label": generateNextWeek[2],
              "text": "選擇"+generateNextWeek[2]
            }
          ]
        },
        {
          "title": "線上預約",
          "text": "選擇下列日期",
          "actions": [
            {
              "type": "message",
              "label": generateNextWeek[3],
              "text": "選擇"+generateNextWeek[3]
            },
            {
              "type": "message",
              "label": generateNextWeek[4],
              "text": "選擇"+generateNextWeek[4]
            },
            {
              "type": "message",
              "label": generateNextWeek[5],
              "text": "選擇"+generateNextWeek[5]
            }
          ]
        },
        {
            "title": "線上預約",
            "text": "選擇下列日期",
            "actions": [
              {
                "type": "message",
                "label": generateNextWeek[6],
                "text": "選擇"+generateNextWeek[6]
              },
              {
                "type": "message",
                "label": generateNextWeek[7],
                "text": "選擇"+generateNextWeek[7]
              },
              {
                "type": "message",
                "label": generateNextWeek[8],
                "text": "選擇"+generateNextWeek[8]
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

module.exports = appointmentTemplate