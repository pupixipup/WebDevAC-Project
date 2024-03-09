const jwt = require("jsonwebtoken")
const User = require("../model/userModel");
const { generateAccessToken, generateRefreshToken } = require("../auth");


exports.authenticate = function authenticate (req, res, next) {

  const accessToken = req.cookies['accessToken'];
  const refreshToken = req.cookies['refreshToken'];

  if (!accessToken && !refreshToken) {
    return res.status(401).send('Access Denied. No token provided.');
  }
  try {
      const { user } = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, {
        ignoreExpiration: true
      })
      jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
    req.user = user;
    console.log(user);
    next();
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      try {
        jwt.verify(refreshToken, process.env.ACCESS_TOKEN_SECRET);
        const { user } = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, {
          ignoreExpiration: true
        })
        const access = generateAccessToken(user);
        const refresh = generateRefreshToken(user)
        res
        .cookie('accessToken', access)
        .cookie('refreshToken', refresh)
        next();
        
      } catch (err) {
        res.status(400).send('Invalid Token.');
      }
    } else {
      res.status(400).send('Invalid Token.');
    }
  }
};
