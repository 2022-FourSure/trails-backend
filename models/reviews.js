const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const reviewsSchema = new Schema({
   content: {type: String, required: true},
   rating: {type: Number, required: true},
   userId: mongoose.Schema.Types.ObjectId, ref: 'User',
   trailId: mongoose.Schema.Types.ObjectId, ref: 'Trail',
})

model.exports = mongoose.model('Review', reviewsSchema);