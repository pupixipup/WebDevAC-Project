const jwt = require("jsonwebtoken")
const User = require("../model/userModel")

exports.authenticate = function authenticate (req, res, next) {

  const accessToken = req.cookies['accessToken'];
  const refreshToken = req.cookies['refreshToken'];

  if (!accessToken && !refreshToken) {
    return res.status(401).send('Access Denied. No token provided.');
  }

  try {
    const decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
    req.user = decoded.user;
    next();
  } catch (error) {
    if (!refreshToken) {
      return res.status(401).send('Access Denied. No refresh token provided.');
    }

    try {
      const decoded = jwt.verify(refreshToken, process.env.ACCESS_TOKEN_SECRET);
      const accessToken = jwt.sign({ user: decoded.user }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' });
      res
      .cookie('accessToken', accessToken)
      .cookie('refreshToken', refreshToken)
      next();
    } catch (error) {
      console.log(error)
      return res.status(400).send('Invalid Token.');
    }
  }
};
