const express = require("express")
const User = require("../models/user")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const upload = require("../services/imgservices")
const router = express.Router()
const transport = require("../services/emailservice")
const { randomBytes } = require("node:crypto")

router.post("/register", upload.single("Profile_pic"), async (req, res) => {
    const { firstName, lastName, email, phoneNumber, password } = req.body
    const hashPassword = bcrypt.hashSync(password, 10)
    const newUser = new User({
        firstName,
        lastName,
        email,
        phoneNumber,
        password: hashPassword,
        img: req.file && req.file?.filename
    })
    await newUser.save()
    res.send({ message: "User Created", newUser })
})

router.post("/login", async (req, res) => {
    const { email, password } = req.body
    const user = await User.findOne({ email })
    if (!user) {
        res.status(404).send({ message: "No such user" })
    }
    else {
        const iscrtPassword = bcrypt.compareSync(password, user.password)
        if (iscrtPassword) {
            const token = jwt.sign({ id: user._id }, process.env.JWT_TOKEN)
            res.send({ message: "User Logged in successfully", user, token })
        }
        else {
            res.status(400).send({ message: "Incorrect Password" })
        }
    }
})

router.get("/profile", async (req, res) => {
    const token = req.headers.authorization.slice(7)
    const decoded = jwt.verify(token, process.env.JWT_TOKEN)
    const user = await User.findOne({ "_id": decoded.id })
    res.send({ message: "User Profile", user })
})

router.post("/forgetpassword", async (req, res) => {
    const emailid = req.body.email
    const user = await User.findOne({ email: emailid })
    if (!user) {
        res.status(400).send({ message: "No such user" })
    }
    else {
        const randToken = Buffer.from(randomBytes(56)).toString('hex')
        user.resetToken = randToken
        await user.save()
        transport.sendMail({
            from: `"Admin" <${process.env.GMAIL_ADDRESS}>`,
            to: user.email,
            subject: "Password Reset",
            html: `<a href="http://localhost:5173/passwordreset?token=${randToken}">Click here..</a>`, // html body
        })
        res.send({ message: "Email sent" })
    }
})

router.post("/resetpassword", async (req, res) => {
    const { password, token } = req.body
    const user = await User.findOne({ randToken: token })
    if (!user) {
        res.status(400).send({ message: "No such user found" })
    }
    else {
        const hashPassword = bcrypt.hashSync(password, 10)
        user.password = hashPassword
        user.resetToken = null
        await user.save()
        res.send({ message: "Password reset success" })
    }
})

module.exports = router