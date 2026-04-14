const mongoose = require("mongoose")
mongoose.connect("mongodb://localhost:27017/example")
const db = mongoose.connection
db.on("error", (e) => {
    console.log("Connection error", e)
})
db.once("open", () => {
    console.log("Connection established")
})