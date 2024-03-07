const mongoose = require("mongoose")
const Location = require("../model/Location")
const locations = require("../stores.json")

async function addLocations() {
  await mongoose.connect('<url>')
  await Location.deleteMany({})
  for (const obj of locations) {
    try {
      // Create a Mongoose document for each object
      const document = new Location(obj)
      // Save the document to the database
      await document.save()
      console.log("Document saved:", document)
    } catch (error) {
      console.error("Error saving document:", error.message)
    }
  }
}

addLocations()
