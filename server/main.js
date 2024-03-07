const express = require("express")
const mongoose = require("mongoose")
const app = express()
const { authenticate } = require("./middleware/authenticate")
var cookieParser = require('cookie-parser')
require("dotenv").config()

const port = 3000
mongoose.connect(process.env.MONGO_URL)

const AuthClass = require("./auth")
const Auth = new AuthClass()

app.use(cookieParser())
app.use(express.json())

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  )
  next()
})


// AUTHENTICATION STUFF ------------------------------------------- START
app.post("/createUser", async (req, res) => {
  Auth.createUser(req, res)
})

app.post("/login", async (req, res) => {
  Auth.login(req, res)
})

// remove after testing
app.get("/getUsers", async (req, res) => {
  Auth.getUsers(req, res)
})

app.get("/greet", authenticate, async (req, res) => {
  res.json({hello: "world"})
})

app.get("/posts", authenticate, (req, res) => {
  res.send(`${req.user.email} successfully accessed post`)
})
// AUTHENTICATION STUFF ------------------------------------------- END
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})