const Review = require('../models/Review');

// Create = create a new review in the database
let index = (req, res) => {
    res.send('Show All Reviews')
}

// Create = create a new review in the database
let create = (req, res) => {
    res.send('Review Created')
}

// Delete = delete a review in the database
let deleteReview = (req, res) => {
    res.send('Review Deleted')
}

module.exports = {
    index,
    create,
    deleteReview
}