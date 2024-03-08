const express = require("express")
const mongoose = require("mongoose")
const Location = require("./model/Location")
const categories = require("./generalized_categories.json")
const cors = require('cors')
const app = express()
const { authenticate } = require("./middleware/authenticate")
var cookieParser = require('cookie-parser')
require("dotenv").config()

const port = 3000
mongoose.connect(process.env.MONGO_URL)

const AuthClass = require("./auth")
const Auth = new AuthClass()


mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("Successful DB connection"))
  .catch((err) => console.log(`Connection failed ${err}`))

app.use(cors({
  origin: true,
  credentials: true,
  sameSite: 'none',
  
}));
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
    const from = parseInt(req.query.from) || 0;
    const sort = req.query.sort
    let category = req.query.category
    let query = {}
    if (category && categories[category]) {
      query.category = { $in: categories[category] }
    }
    const locations = await Location.find(query)
      .sort({ name: sort })
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
});
// remove after testing
app.get("/getUsers", async (req, res) => {
  Auth.getUsers(req, res)
})

app.get("/greet", authenticate, async (req, res) => {
  res.json({hello: "world"})
})

app.get("/posts", authenticate, (req, res) => {
  res.send(`${req.user.email} successfully accessed post`)
})
// AUTHENTICATION STUFF ------------------------------------------- END
app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})
