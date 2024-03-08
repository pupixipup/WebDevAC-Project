const mongoose = require("mongoose")
const bcrypt = require("bcrypt")
const validator = require("validator")

const Schema = mongoose.Schema

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  role: {
    type: String,
    default: 'user',
    enum: ['user', 'admin'],
  },
  name: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true,
  },
})

// signup method
userSchema.statics.signup = async function (user) {
  const { email, password, name } = user;
  if (!email || !password || !name) {
    throw Error("All fields must be filled")
  }
  if (!validator.isEmail(email)) {
    throw Error("Email is not valid")
  }
  var validationSettings = {
    minLowerCase: 0,
    minUppercase: 0,
    minNumbers: 0,
    minSymbols: 0,
  }
  if (!validator.isStrongPassword(password, validationSettings)) {
    throw Error("Password is not strong enough")
  }

  const exists = await this.findOne({ email })

  if (exists) {
    throw Error("Email already in use")
  }

  const hashedPassword = await bcrypt.hash(password, 10)

  return (await this.create({ name, email, password: hashedPassword }))
}

// login method
userSchema.statics.login = async function (email, password) {
  if (!email || !password) {
    throw Error("All fields must be filled")
  }

  const user = await this.findOne({ email })

  if (!user) {
    throw Error("Incorrect email")
  }

  const match = await bcrypt.compare(password, user.password)

  if (!match) {
    throw Error("Incorrect password")
  }

  return user
}

module.exports = mongoose.model("User", userSchema)
