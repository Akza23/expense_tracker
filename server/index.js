const cors = require("cors")
const dotenv = require("dotenv")
dotenv.config()
const express = require("express")
require("./db.js")

const app = express()
app.use(cors())
app.use(express.json())

app.use("/uploads", express.static("uploads/"))

const userController = require("./controllers/usercontroller.js")
app.use("/user", userController)
const expenseController = require("./controllers/expensecontroller.js")
app.use("/expense", expenseController)
const adminController = require("./controllers/admincontroller.js")
app.use("/admin", adminController)
app.listen(8080, () => {
    console.log("Server running at port no:8080")
})