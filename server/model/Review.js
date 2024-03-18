const mongoose = require("mongoose")

const reviewSchema = new mongoose.Schema({
    locationId: {
      required: true,
      type: mongoose.Types.ObjectId
    },
    reviewerId: {
      type: mongoose.Types.ObjectId,
      required: true,
    },
    score: {
      type: Number,
      required: true,
      min: 0,
      max: 5
    },
    description: {
      type: String,
      required: true,
      minLength: [15, 'Description is too short'],
      maxLength: [200, 'Description is too long']
    }
}, {
  timestamps: true
})

const Review = mongoose.model("Review", reviewSchema)

module.exports = Review;