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
  const users = await Auth.createUser(req)
  res.status(201).send(users)
  console.log(users)
})

app.post("/login", async (req, res) => {
  loginResults = await Auth.login(req)

  if (!loginResults.loginSuccess) {
    res.status(400).send(loginResults.loginError)
  } else {
    res.json({
      accessToken: loginResults.accessToken,
      refreshToken: loginResults.refreshToken,
    })
  }
})

// Test more
// Needs to also take in user name in body and test if user exists
app.post("/refreshToken", (req, res) => {
  const refreshTokenResponse = Auth.refreshToken(req)

  res.json(refreshTokenResponse)
})

// Needs to do more things like remove the accesstoken
app.delete("/logout", (req, res) => {
  refreshTokens = refreshTokens.filter((c) => c != req.body.token)

  res.status(204).send("Logged out!")
})

app.get("/posts", validateJwtToken, (req, res) => {
  console.log("Token is valid")
  console.log(req.user.user)
  res.send(`${req.user.user} successfully accessed post`)
})
// AUTHENTICATION STUFF ------------------------------------------- END

console.log("env:", process.env.MONGO_URL)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
