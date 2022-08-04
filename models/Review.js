const mongoose = require('mongoose')

// Create a Review Schema
// Users and Trails are referenced schemas within it
const reviewSchema = new mongoose.Schema({
   content: {type: String, required: true},
   rating: {type: Number, required: true},
   userId: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
})

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;