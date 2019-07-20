
const isToday = (someDate) => {
    const today = new Date()
    return someDate.getDate() == today.getDate() &&
      someDate.getMonth() == today.getMonth() &&
      someDate.getFullYear() == today.getFullYear()
}
//check if the date is passed
const isPassed = (someDate) => {
    const today = new Date()
    return someDate.getDate() < today.getDate() &&
      someDate.getMonth() <= today.getMonth() &&
      someDate.getFullYear() <= today.getFullYear()
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