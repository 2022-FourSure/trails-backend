const { connect } = require('mongoose');
const Review = require('../models/Review');
const Trail = require('../models/Trail');

// Create = create a new review in the database
let create = async (req, res) => {
    // Create the review and save to the database
    let newReview = await Review.create(req.body)
    // Add the review mongo ID to the trail per the Trail schema
    Trail.findByIdAndUpdate(req.params.id, {$push:{reviews: newReview._id}}, {new:true})
    // .populate('reviews')
    .then(
        (trail, err) => {
            console.log(err, trail)
            if(err){
                res.status(400).json(err)
                return
            }
            Trail.findById(req.params.id)
            .populate('reviews')
            .then((trail, err) => {
                console.log('err', err)
                console.log('trail', trail)
                res.json(trail)
                })
        })        
    }

// Delete = delete a review in the database
let deleteReview = async (req, res) => {
    // Use Trail and Review IDs in the params to update 
    Trail.findByIdAndUpdate(
        req.params.id, 
        {$pull:{reviews:req.params.reviewId}}, 
        {new: true}, 
        async (err, trail) => {
            if(err){
                res.status(400).json(err)
                return
            }
            let reviews = trail.reviews.filter(review => {
                review._id !== req.params.reviewId
                console.log(review._id)
                return review
            })
            console.log('trail.reviews: ', trail.reviews)
            trail.reviews = reviews
            await trail.save();
            res.json(trail)
        });
    };

module.exports = {
    create,
    deleteReview
}