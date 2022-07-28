// This file is used to seed the database
// Run it by calling `node databse/seeds.js`

require('./connection');
const Trail = require('../models/Trail');
const Review = require('../models/Review');
const trailSeeds = require('./trailSeeds.json');
const reviewSeeds = require('./reviewSeeds.json');

// Delete all trails in the database
Trail.deleteMany({})
    .then(()=> Review.deleteMany({}))

    .then(() => {
        // Return newly inserted trails into the database
        return Trail.insertMany(trailSeeds)
    }).then((trails)=>{
        console.log(trails)
        let seedReviews = reviewSeeds.map(seed => {
            // Set the TrailId for the current seed so it matches the trail's ID with the same name
            seed.trailId = trails.find(t=> t.name == seed.name)?._id
            return seed
        })
        return Review.insertMany(seedReviews)
    }).then(console.log)
    .catch(console.error)
    .finally(()=>{
        process.exit();
    });