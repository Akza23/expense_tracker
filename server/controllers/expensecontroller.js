const express = require("express")
const jwt = require("jsonwebtoken")
const Expense = require("../models/expense")
const router = express.Router()

router.post("/add", async (req, res) => {
    try {
        const { Name, Description, Date, Amount, DRorCR } = req.body
        const token = req.headers.authorization.slice(7)
        const decoded = jwt.verify(token, process.env.JWT_TOKEN)
        const expense = new Expense({
            UserID: decoded.id,
            Name,
            Description,
            Date,
            Amount,
            DRorCR
        })
        await expense.save()
        await expense.populate("UserID")
        res.send({ message: "Successfully entered", expense })
    }
    catch (e) {
        if (e instanceof jwt.JsonWebTokenError || e instanceof jwt.TokenExpiredError) {
            res.status(403).send({ message: "jwt error", error: e })
        }
        res.status(400).send({ message: "Error Occured", error: e })
    }
})

router.get("/view", async (req, res) => {
    const token = req.headers.authorization.slice(7)
    const decoded = jwt.verify(token, process.env.JWT_TOKEN)
    const expense = await Expense.find({ "UserID": decoded.id }).populate("UserID")
    if (expense) {
        res.send(expense)
    }
    else {
        res.status(404).send({ message: "No data" })
    }
})

router.get("/view/amount", async (req, res) => {
    const amount = req.body.Amount
    const item = await Expense.find({ "Amount": { $gt: amount } })
    if (item) {
        res.send(item)
    }
    else {
        res.status(404).send({ message: "No data" })
    }
})

router.get("/view/:id", async (req, res) => {
    const id = req.params.id
    const expense = await Expense.findOne({ _id: id })
    if (expense) {
        res.send(expense)
    }
    else {
        res.status(404).send({ message: "No data" })
    }
})

router.get("/weekly", async (req, res) => {
    const token = req.headers.authorization.slice(7)
    const decoded = jwt.verify(token, process.env.JWT_TOKEN)
    const currentdate = new Date()
    const day = currentdate.getDay()
    //  console.log(day)
    // console.log(currentdate.getDate())
    const sunday = new Date(currentdate.setDate(currentdate.getDate() - day))
    // console.log(sunday)
    // console.log(sunday.getDate())
    const saturday = new Date(currentdate.setDate(sunday.getDate() + 6))
    // console.log(saturday)
    const expense = await Expense.find({ "UserID": decoded.id, Date: { $gt: sunday, $lt: saturday } })
    res.send(expense)
})

router.get("/monthly", async (req, res) => {
    const token = req.headers.authorization.slice(7)
    const decoded = jwt.verify(token, process.env.JWT_TOKEN)
    const currentdate = new Date()
    const fday = new Date(currentdate.setDate(1))
    console.log(currentdate.getFullYear())
    const lday = new Date(currentdate.getFullYear(), currentdate.getMonth() + 1, 0)
    console.log(lday)
    const expense = await Expense.find({ "UserID": decoded.id, Date: { $gt: fday, $lt: lday } })
    res.send(expense)
})

router.get("/weeklyuser", async (req, res) => {
    try {
        const token = req.headers.authorization.slice(7)
        const decoded = jwt.verify(token, process.env.JWT_TOKEN)
        // const expense=await Expense.find({"UserID":decoded.id})
        const currentdate = new Date()
        const day = currentdate.getDay()
        const sunday = new Date(currentdate.setDate(currentdate.getDate() - day))
        const saturday = new Date(currentdate.setDate(sunday.getDate() + 6))
        const expense = await Expense.find({ "UserID": decoded.id, Date: { $gt: sunday, $lt: saturday } })
        res.send({ message: "Current user  Week Expense", expense })
    }
    catch (e) {
        if (e instanceof jwt.JsonWebTokenError || e instanceof jwt.TokenExpiredError) {
            res.status(403).send({ message: "jwt error", error: e })
        }
        res.status(400).send({ message: "Error Occured", error: e })
    }
})

module.exports = router