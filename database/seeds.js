// This file is used to seed the database
// Run it by calling `node databse/seeds.js`

require('./connection');
const Trail = require('../models/Trail');
const Review = require('../models/Review');
const trailSeeds = require('./trailSeeds.json');
const reviewSeeds = require('./reviewSeeds.json');

// Delete all trails in the database
Trail.deleteMany({})
    // Delete all reviews in the database
    .then(()=> Review.deleteMany({}))

    .then(() => {
        // Save the newly created trails to the database
        return Trail.insertMany(trailSeeds)
    }).then((trails)=>{
        console.log(trails)
        // Create an review array associated with trails
        // by mapping over the seed data
        let seedReviews = reviewSeeds.map(seed => {
            // Set the trailId for the current seed so it matches the 
            // trail's ID in the database with the same name
            seed.trailId = trails.find(t=> t.name == seed.name)?._id
            return seed
        })
        // Save the newly created reviews to the database
        return Review.insertMany(seedReviews)
    }).then(console.log)
    .catch(console.error)
    .finally(()=>{
        process.exit();
    });