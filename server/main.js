const express = require("express")
const mongoose = require("mongoose")
const app = express()
require("dotenv").config()

const port = 3000
const connection = mongoose.connect(process.env.MONGO_URL)
const { validateJwtToken } = require("./middleware/validateJwtToken")

const AuthClass = require("./auth")
const Auth = new AuthClass()

app.use(express.json())

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  )
  next()
})

app.get("/", (req, res) => {
  res.json({ hello: "world" })
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

// app.post("/refreshToken", (req, res) => {
//   const refreshTokenResponse = Auth.refreshToken(req)
//   res.json(refreshTokenResponse)
// })

app.get("/posts", validateJwtToken, (req, res) => {
  console.log("Token is valid")
  console.log(req.user)
  res.send(`${req.user} successfully accessed post`)
})
// AUTHENTICATION STUFF ------------------------------------------- END

console.log("env:", process.env.MONGO_URL)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
