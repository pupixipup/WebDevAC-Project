const jwt = require("jsonwebtoken")
const User = require("./model/userModel")
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
    try {
      let user = await User.signup(req.body);
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
      res.cookie('accessToken', token)
      .status(200).json({user})
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
