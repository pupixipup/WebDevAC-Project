const express = require("express")
const mongoose = require("mongoose")
const app = express()
const Location = require("./model/Location")
const {query} = require("express");
require("dotenv").config()

const port = 3000

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("Successful DB connection"))
  .catch((err) => console.log(`Connection failed ${err}`))

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  )
  next()
})

app.use(express.static('public'))

app.get("/", (req, res) => {
  res.json({ hello: "world" })
})

app.get("/locations", async (req,res) => {
  const from = req.query.from;
  const locations = await Location.find().limit(10).skip(from);
  console.log(from, locations[0].name)
  const count = await Location.countDocuments()
  res.json({locations, count})
})

console.log("env:", process.env.MONGO_URL)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
