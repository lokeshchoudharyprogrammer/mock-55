const mongoose = require("mongoose")

let UseModels = mongoose.Schema({
    email: { type: String },
    password: { type: String }
})

const Useschema = mongoose.model("User", UseModels)


module.exports = { Useschema };