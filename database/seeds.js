// This file is used to seed the database
// Run it by calling `node databse/seeds.js`

require('./connection');
const Trail = require('../models/Trail');
const Review = require('../models/Review');
const trailSeeds = require('./trailSeeds.json');
const reviewSeeds = require('./reviewSeeds.json');

// NEW APPROACH TEST
// Delete all trails in the database
Trail.deleteMany({})
    // Delete all reviews in the database
    .then(()=> Review.deleteMany({}))

    .then(() => {
        // Save the review seed data in to the database
        return Review.insertMany(reviewSeeds)
    }).then((reviews)=>{
        console.log(reviews)
        // Create a  trail array by mapping over the trail seed data
        let trails = trailSeeds.map(trail => {
            // For seeding data, we created a temp value reviewss in the trail seed data
            // for the position in the reviewSeeds array it should correspond to.
            // We find the review with text that matches the text of the review
            // in that position and push it to the trails array. 
            trail.reviews.push(reviews.find(r => reviewSeeds[trail.reviewss[0]].content === r.content)._id)
            return trail
        })
        // Save the newly created trails to the database
        return Trail.insertMany(trails)
    }).then(console.log)
    .catch(console.error)
    .finally(()=>{
        process.exit();
    });


// // PREVIOUS APPROACH, WORKED BUT WRONG REFS
// // Delete all trails in the database
// Trail.deleteMany({})
//     // Delete all reviews in the database
//     .then(()=> Review.deleteMany({}))

//     .then(() => {
//         // Save the newly created trails to the database
//         return Trail.insertMany(trailSeeds)
//     }).then((trails)=>{
//         console.log(trails)
//         // Create an review array associated with trails
//         // by mapping over the seed data
//         let seedReviews = reviewSeeds.map(seed => {
//             // Set the trailId for the current seed so it matches the 
//             // trail's ID in the database with the same name
//             seed.trailId = trails.find(t=> t.name == seed.name)?._id
//             return seed
//         })
//         // Save the newly created reviews to the database
//         return Review.insertMany(seedReviews)
//     }).then(console.log)
//     .catch(console.error)
//     .finally(()=>{
//         process.exit();
//     });