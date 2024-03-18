const express = require("express")
const mongoose = require("mongoose")
const Location = require("./model/Location")
const Review = require("./model/Review")
const User = require("./model/userModel")
const categories = require("./generalized_categories.json")
const cors = require("cors")
const app = express()
const { authenticate } = require("./middleware/authenticate")
var cookieParser = require("cookie-parser")
require("dotenv").config()

const port = 3000
mongoose.connect(process.env.MONGO_URL)

const { AuthClass } = require("./auth")
const Auth = new AuthClass()

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("Successful DB connection"))
  .catch((err) => console.log(`Connection failed ${err}`))

app.use(
  cors({
    origin: true,
    credentials: true,
    sameSite: "none",
  })
)
app.use(cookieParser())
app.use(express.json())

// AUTHENTICATION STUFF ------------------------------------------- START
app.post("/createUser", async (req, res) => {
  Auth.createUser(req, res)
})

app.post("/login", async (req, res) => {
  Auth.login(req, res)
})
app.use(express.static("public"))

app.get("/locations", async (req, res) => {
  try {
    const from = parseInt(req.query.from) || 0
    const sort = req.query.sort
    /* Filter */
    let category = req.query.category
    let query = {}
    if (category && categories[category]) {
      query.category = { $in: categories[category] }
    }
    /* Sort */
    let sortParams = {}
    if (sort) {
      sortParams.name = sort
    }
    const locations = await Location.find(query)
      .sort(sortParams)
      .skip(from)
      .limit(10)
    const count = await Location.countDocuments(query)
    res.json({ locations, count })
  } catch (err) {
    console.log(err)
  }
})

app.get("/locations/:id", async (req, res) => {
  try {
    const { id } = req.params
    const location = await Location.findById(id)
    res.json(location)
  } catch (err) {
    console.log(err)
  }
})
// remove after testing
app.get("/users", async (req, res) => {
  Auth.getUsers(req, res)
})

// delete location
app.delete("/locations/:id", async (req, res) => {
  try {
    const { id } = req.params
    const location = await Location.findByIdAndDelete(id)
    res.json(location)
  } catch (err) {
    console.log(err)
  }
})

app.post("/review", authenticate, async (req, res) => {
  try {
    const { description, locationId, score, reviewerId } = req.body
    const newReview = new Review({ description, reviewerId, locationId, score })
    await newReview.save()
    res.status(200).send("Review created")
  } catch (err) {
    console.log(err)
    res.status(500).send(err)
  }
})

app.get("/reviews", async (req, res) => {
  try {
    const { reviewerId, locationId } = req.query
    const query = {}
    if (reviewerId) query.reviewerId = reviewerId
    if (locationId) query.locationId = locationId
    const reviews = await Review.find(query)
    res.status(200).json(reviews)
  } catch (err) {
    console.log(err)
    res.status(500).send(err)
  }
})

app.get("/users/:username", async (req, res) => {
  try {
    const { username } = req.params
    const isId = mongoose.isValidObjectId(username)
    let user
    if (isId) {
      user = await User.findById(username)
    } else {
      user = await User.findOne({ name: username })
    }
    res.json(user)
  } catch (err) {
    console.log(err)
  }
})

app.get("/greet", authenticate, async (req, res) => {
  res.json({ hello: "world" })
})

app.get("/posts", authenticate, (req, res) => {
  res.send(`${req.user.email} successfully accessed post`)
})
// AUTHENTICATION STUFF ------------------------------------------- END
app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})
