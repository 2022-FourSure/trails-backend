const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const trailsSchema = new Schema({
   name: {type: String, required: true},
   location: {type: String, required: true},
   difficulty: {type: Number, required: true},
   length: {type: Number, required: true},
   elevationChange: {type: Number, required: true},
   routeType: {type: String, required: true},
   description: {type: String, required: true},
   image: {type: String, required: true},
   cloudinary_id: {type: String, required: true},
   reviews: mongoose.Schema.Types.ObjectId, ref: 'Review',
})

module.exports = mongoose.model('Trail', trailsSchema);