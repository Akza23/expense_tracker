const mongoose = require("mongoose")
const expenseSchema = mongoose.Schema({
    UserID: { type: mongoose.Schema.ObjectId, required: true, ref: "user" },
    Name: { type: String, required: true },
    Description: { type: String, required: true },
    Date: { type: Date, required: true },
    Amount: { type: Number, required: true },
    DRorCR: { type: String, required: true }
})

const Expense = mongoose.model("expense", expenseSchema)
module.exports = Expense