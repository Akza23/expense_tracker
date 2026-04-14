const express = require("express")
const jwt = require("jsonwebtoken")
const user = require("../models/user.js")
const expense = require("../models/expense.js")
const router = express.Router()

router.post("/login", async (req, res) => {
	const { username, password } = req.body
	if (username == "admin" && password == "admin@123") {
		const token = jwt.sign({ admin: true }, process.env.JWT_TOKEN)
		res.send({ message: "Login Successfully", token })
	}
	else {
		res.status(400).send({ message: "Login Failed" })
	}
})

router.get("/viewusers", async (req, res) => {
	const token = req.headers.authorization.slice(7)
	const decoded = jwt.verify(token, process.env.JWT_TOKEN)
	const search = req.query.search
	if (decoded.admin) {
		let query = {}
		if (search.trim() != "") {
			query = { $text: { $search: search } }
		}
		const users = await user.find(query).select("-password")
		res.send({ message: "Available Users", users })
	}
	else {
		res.status(403).send({ message: "Not admin" })
	}

})
router.put("/updateuser/:id", async (req, res) => {
	const token = req.headers.authorization.slice(7)
	const decoded = jwt.verify(token, process.env.JWT_TOKEN)
	if (decoded.admin) {
		const User = await user.updateOne({ _id: req.params.id }, { firstName: req.body.firstName })
		res.send({ message: "User Updated", User })
	}
	else {
	}
})

router.delete("/deleteuser/:id", async (req, res) => {
	const token = req.headers.authorization.slice(7)
	const decoded = jwt.verify(token, process.env.JWT_TOKEN)
	if (decoded.admin) {
		const User = await user.deleteOne({ _id: req.params.id })
		res.send({ message: "User Deleted", User })
	}
	else {
		res.status(403).send({ message: "Not admin" })
	}
})

router.get("/countusers", async (req, res) => {
	const token = req.headers.authorization.slice(7)
	const decoded = jwt.verify(token, process.env.JWT_TOKEN)
	if (decoded.admin) {
		const Count = await user.countDocuments()
		res.send({ message: "Total Users", Count })
	}
	else {
		res.status(403).send({ message: "Not Admin" })
	}
})

router.get("/viewuserexpense/:id", async (req, res) => {
	const user_id = req.params.id
	const token = req.headers.authorization.slice(7)
	const decoded = jwt.verify(token, process.env.JWT_TOKEN)
	if (decoded.admin) {
		const UserExpense = await expense.find({ UserID: user_id })
		res.send({ message: "Expense detailes", UserExpense })
	}
	else {
		res.status(403).send({ message: "Not Admin" })
	}
})

router.get("/chart", async (req, res) => {
	const token = req.headers.authorization.slice(7)
	const decoded = jwt.verify(token, process.env.JWT_TOKEN)
	if (decoded.admin) {
		const result = await user.aggregate([
			{
				$match: {
					createdAt: { $ne: null }
				}
			},
			{
				$group:
				{
					_id: { $dateTrunc: { date: "$createdAt", unit: "day" } },
					count: { $sum: 1 }
				}
			},
			{
				$sort: {
					_id: 1
				}
			},
			{
				$project: {
					count: "$count",
					date: "$_id"
				}
			}

		])
		res.send({ message: "Detailes sended", result })
	}
	else {
		res.status(403).send({ message: "Not Admin" })
	}
})

module.exports = router