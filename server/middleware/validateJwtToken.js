const jwt = require("jsonwebtoken")
const User = require("../models/userModel")

exports.validateJwtToken = async (req, res, next) => {
  const { authorization } = req.headers

  if (!authorization) {
    return res.status(401).json({ error: "Authorization token required" })
  }

  const token = authorization.split(" ")[1]

  try {
    const { _id } = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)

    // Add user id to request (broken?)
    req.user = await User.findOne({ _id }).select("_id")

    next()
  } catch (error) {
    console.log(error)
    res.status(401).json({ error: "Request is not authorized" })
  }
}
