const mongoose = require('mongoose')
const Schema = mongoose.Schema;

// Create a Trail Schem
// Reviews are a referenced schema inside it 
const trailSchema = new Schema({
   name: {type: String, required: true},
   location: {type: String, required: true},
   difficulty: {type: Number, required: true},
   length: {type: Number, required: true},
   elevationChange: {type: Number, required: true},
   routeType: {type: String, required: true},
   description: {type: String, required: true},
   image: {type: String, required: true},
   cloudinary_id: {type: String, required: true},
   reviews: [{ type: Schema.Types.ObjectId, ref: 'Review' }]
})

const Trail = mongoose.model('Trail', trailSchema);

module.exports = Trail;