const mongoose = require('mongoose')
const Schema = mongoose.Schema

const profileSchema = new Schema({
    email: String,
    userID: String,
    name: String

})

profileSchema.statics.lookUp = function (userID){
    return this.findOne({userID:userID})
}

module.exports = mongoose.model("Profile", profileSchema)