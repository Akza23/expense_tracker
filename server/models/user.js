const mongoose = require("mongoose")
const userSchema = mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    phoneNumber: { type: String },
    password: { type: String, required: true },
    img: { type: String },
    resetToken: { type: String }
}, { timestamps: true })
userSchema.index({ firstName: "text" })  //index for firstname of user creation
const User = mongoose.model("user", userSchema)

module.exports = User