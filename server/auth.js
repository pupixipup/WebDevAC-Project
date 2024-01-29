const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
require("dotenv").config()

const users = [] // PUT IN DATABASE
let refreshTokens = [] // should be stored in a "Redis" it says

//Needs to test if a user was given, right now it runs anyway
function generateAccessToken(user) {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "15m" })
}

//Needs to test if a user was given, right now it runs anyway
function generateRefreshToken(user) {
  const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: "20m",
  })
  refreshTokens.push(refreshToken)
  return refreshToken
}

class AuthClass {
  async createUser(req) {
    const user = req.body.name
    const hashedPassword = await bcrypt.hash(req.body.password, 10)

    users.push({ user: user, password: hashedPassword })

    return users
  }

  async login(req) {
    const user = users.find((c) => c.user == req.body.name)

    if (!user) {
      return {
        loginSuccess: false,
        loginError: "User does not exist",
      }
    } else if (await bcrypt.compare(req.body.password, user.password)) {
      console.log("Got to login")
      const accessToken = generateAccessToken({ user: req.body.name })
      const refreshToken = generateRefreshToken({ user: req.body.name })
      return {
        loginSuccess: true,
        accessToken: accessToken,
        refreshToken: refreshToken,
      }
    } else {
      return {
        loginSuccess: false,
        loginError: "Incorrect password",
      }
    }
  }

  refreshToken(req) {
    if (!refreshTokens.includes(req.body.token)) {
      return "Refresh token is invalid"
    } else {
      refreshTokens = refreshTokens.filter((c) => c != req.body.token)
      const accessToken = generateAccessToken({ user: req.body.name })
      const refreshToken = generateRefreshToken({ user: req.body.name })

      return { accessToken: accessToken, refreshToken: refreshToken }
    }
  }
}

module.exports = AuthClass
