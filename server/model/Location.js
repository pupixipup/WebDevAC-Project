const mongoose = require("mongoose")

const locationSchema = new mongoose.Schema({
    name: String,
    district: {
        type: String,
        allowNull: true
    },
    address: String,
    map_frame: String,
})

const Location = mongoose.model("Location", locationSchema)

module.exports = Location;