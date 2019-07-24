
const isToday = (someDate) => {
    const today = new Date()
    return someDate.getDate() == today.getDate() &&
      someDate.getMonth() == today.getMonth() &&
      someDate.getFullYear() == today.getFullYear()
}
//check if the date is passed
const isPassed = (date, time) => {
    let today = new Date().getTime()
    let someDate = new Date(date).getTime()
    let selectedTime = someDate + (time * 60 * 60 * 1000)
    console.log(today+" today   "+ "selectedTime" + selectedTime)
    return selectedTime <= today 
    /* return someDate.getDate() < today.getDate() &&
      someDate.getMonth() <= today.getMonth() &&
      someDate.getFullYear() <= today.getFullYear()*/
} 

const isPassedTime = (someTime) =>{
    var now = new Date();
    var time = now.getHours() * 60 + now.getMinutes();
    return time >= someTime
}

//check time
function inTime(start, end) {
    var now = new Date();
    var time = now.getHours() * 60 + now.getMinutes();
    console.log("Check Time " + time + " NOW")
    return time >= start && time < end;
}

module.exports ={isToday,
                isPassed,
                isPassedTime, 
                inTime}