// This file is used to seed the database
// Run it by calling `node databse/seeds.js`

// Require the database connection 
require('./connection');

// Require the Trail model
const Trail = require('../models/Trail');

// Require the seed data in seeds.json
const trailSeeds = require('./seeds.json');

// Delete all trails in the database
Trail.deleteMany({})

    .then(() => {
        // Return newly inserted trails into the database
        return Trail.insertMany(trailSeeds)
    }).then((trails)=>{
        console.log(trails)
    })
    .catch(console.error)
    .finally(()=>{
        process.exit();
    });