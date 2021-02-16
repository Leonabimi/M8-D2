const express = require("express")
const UserModel = require("./schema")
const {basic} = require("./auth")

const usersRouter = express.Router()

usersRouter.get("/",basic, async(req, res, next) => {
    try {
      const users = await UserModel.find()
      res.send(users)  
    } catch (error) {
        console.log(error)
    }
})

usersRouter.post("/register", async (req, res ,next) => {
    try {
      const newUser = new UserModel(req.body)
      const { _id } = await newUser.save()
      res.send(_id)  
    } catch (error) {
        console.log(error)
    }
})



module.exports = usersRouter