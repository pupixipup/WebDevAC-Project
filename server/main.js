const express = require("express")
const mongoose = require("mongoose")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const app = express()
require("dotenv").config()

const port = 3000
const connection = mongoose.connect(process.env.MONGO_URL)
const { validateJwtToken } = require("./middleware/validateJwtToken")

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

// AUTHENTICATION STUFF ------------ START
const users = [] // PUT IN DATABASE
let refreshTokens = [] // should be stored in a "Redis" it says

function generateAccessToken(user) {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "15m" })
}

function generateRefreshToken(user) {
  const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: "20m",
  })
  refreshTokens.push(refreshToken)
  return refreshToken
}

app.post("/createUser", async (req, res) => {
  const user = req.body.name
  const hashedPassword = await bcrypt.hash(req.body.password, 10)

  users.push({ user: user, password: hashedPassword })

  res.status(201).send(users)

  console.log(users)
})

app.post("/login", async (req, res) => {
  const user = users.find((c) => c.user == req.body.name)
  console.log(user)

  if (!user) res.status(404).send("User does not exist")
  else if (await bcrypt.compare(req.body.password, user.password)) {
    console.log("Got to login")

    const accessToken = generateAccessToken({ user: req.body.name })
    const refreshToken = generateRefreshToken({ user: req.body.name })

    res.json({ accessToken: accessToken, refreshToken: refreshToken })
  } else {
    console.log("Password incorrect")
    res.status(401).send("Password incorrect")
  }
})

// UNTESTED!!!!
app.post("/refreshToken", (req, res) => {
  if (!refreshTokens.includes(req.body.token)) {
    res.status(400).send("Refresh token invalid")
  }

  refreshTokens = refreshTokens.filter((c) => c != req.body.token)
  const accessToken = generateAccessToken({ user: req.body.name })
  const refreshToken = generateRefreshToken({ user: req.body.name })

  res.json({ accessToken: accessToken, refreshToken: refreshToken })
})

app.delete("/logout", (req, res) => {
  refreshTokens = refreshTokens.filter((c) => c != req.body.token)

  res.status(204).send("Logged out!")
})

app.get("/posts", validateJwtToken, (req, res) => {
  console.log("Token is valid")
  console.log(req.user.user)
  res.send(`${req.user.user} successfully accessed post`)
})
// AUTHENTICATION STUFF ------------ END

console.log("env:", process.env.MONGO_URL)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
