const mongoose = require('mongoose')

// Create a Review Schema
// Users and Trails are referenced schemas within it
const reviewSchema = new mongoose.Schema({
   content: {type: String, required: true},
   rating: {type: Number, required: true},
   userId: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
   // BILLIE RECOMMENDED NOT REFERENCING REVIEWS TO TRAILS AND TRAILS TO REVIEWS, JUST ONE
   // REMOVED TRAILID FROM THIS SCHEMA
   // trailId: {type: mongoose.Schema.Types.ObjectId, ref: 'Trail'},
})

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;