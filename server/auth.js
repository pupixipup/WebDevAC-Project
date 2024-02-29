const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const User = require("./models/userModel")
require("dotenv").config()

let refreshTokens = [] // should be stored in a "Redis" it says

function generateAccessToken(id) {
  return jwt.sign({ id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "15m" })
}

// function generateRefreshToken(id) {
//   const refreshToken = jwt.sign(id, process.env.REFRESH_TOKEN_SECRET, {
//     expiresIn: "20m",
//   })
//   refreshTokens.push(refreshToken)
//   return refreshToken
// }

class AuthClass {
  async createUser(req, res) {
    const { email, password } = req.body

    try {
      const user = await User.signup(email, password)

      const token = generateAccessToken(user._id)

      res.status(200).json({ email, token })
    } catch (error) {
      res.status(400).json({ error: error.message })
    }
  }

  async login(req, res) {
    const { email, password } = req.body

    try {
      const user = await User.login(email, password)

      const token = generateAccessToken(user._id)

      res.status(200).json({ email, token })
    } catch (error) {
      res.status(400).json({ error: error.message })
    }
  }

  // Test function
  async getUsers(req, res) {
    const allUsers = await User.find({})

    res.status(200).json(allUsers)
  }

  // refreshToken(req) {
  //   if (!refreshTokens.includes(req.body.token)) {
  //     return "Refresh token is invalid"
  //   } else {
  //     refreshTokens = refreshTokens.filter((c) => c != req.body.token)
  //     const accessToken = generateAccessToken({ user: req.body.name })
  //     const refreshToken = generateRefreshToken({ user: req.body.name })

  //     return { accessToken: accessToken, refreshToken: refreshToken }
  //   }
  // }
}

module.exports = AuthClass
