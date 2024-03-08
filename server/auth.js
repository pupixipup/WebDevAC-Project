const jwt = require("jsonwebtoken")
const User = require("./models/userModel")
require("dotenv").config()

function generateAccessToken(user) {
  return jwt.sign({ user }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "15m" })
}

function generateRefreshToken(user) {
  const token = jwt.sign({ user }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "2h" })
  return token;
}

class AuthClass {
  async createUser(req, res) {
    const { email, password } = req.body

    try {
      let user = await User.signup(email, password);
      const token = generateAccessToken(user)

      res.status(200).json({user, token})
    } catch (error) {
      res.status(400).json({ error: error.message })
    }
  }

  async login(req, res) {
    const { email, password } = req.body
    try {
      let user = await User.login(email, password);
      const token = generateAccessToken(user)
      const refreshToken = generateRefreshToken(user)
      res.cookie('refreshToken', refreshToken)
      .header('Authorization', token)
      .status(200).json({user, token, refreshToken})
    } catch (error) {
      res.status(400).json({ error: error.message })
    }
  }

  // Test function
  async getUsers(req, res) {
    const allUsers = await User.find({})

    res.status(200).json(allUsers)
  }
}

module.exports = AuthClass
