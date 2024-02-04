const express = require("express")
const mongoose = require("mongoose")
const app = express()
const Location = require("./model/Location")
const categories = require("./generalized_categories.json")
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

app.get("/locations", async (req, res) => {
  try {
  const from = req.query.from;
  const sort = req.query.sort;
  let category = req.query.category;
  let query = {};
  if (category && categories[category]) {
    query.category = { $in: categories[category] }
  };
  const locations = await Location.find(query).sort({name: sort}).limit(10).skip(from)
  const count = await Location.countDocuments(query)
  res.json({ locations, count })
} 
catch (err) {
  console.log(err)
}
})

console.log("env:", process.env.MONGO_URL)

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})
