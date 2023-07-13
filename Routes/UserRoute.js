const mongoose = require("mongoose")
const express = require("express");
const jwt = require("jsonwebtoken")
const bcrypt = require('bcrypt');
const { Useschema } = require("../Models/User");
const AuthRouter = express.Router()


AuthRouter.post("/register", async (req, res) => {
    let { email, password } = req.body

    console.log(email, password)

    const exitUser = await Useschema.findOne({ email })
    if (exitUser) {
        return res.send({ mag: "user already Exist" })
    }
    bcrypt.hash(password, 5, async (err, hash) => {
        const user = new Useschema({
            email,
            password: hash

        })
        await user.save()

        return res.send({ mag: "user Created " })
    })
})

AuthRouter.post("/login", async (req, res) => {
    let { email, password } = req.body
    console.log(email, password)
    const exitUser = await Useschema.findOne({ email })
    try {
        if (exitUser) {
            bcrypt.compare(password, exitUser.password).then(function (result) {
                // result == false
                if (result) {

                    const token = jwt.sign({ userID: exitUser._id, userName: exitUser.email }, "shhhhh");

                    res.send({
                        msg: "Login SuccessFull",
                        token,
                        userID: exitUser._id, userName: exitUser.email
                    })
                } else {
                    res.send({ mag: "wrong data" })
                }
            });
        }
    } catch (error) {
        res.send({ mag: "wrong data" })
    }




})


module.exports = { AuthRouter };