// Require Trail model
const Trail = require('../models/Trail');
// Require Cloudinary
const cloudinary = require('../utils/cloudinary');

// Index = get all trails
let index = (req, res) => {
    // Respond with all the trails
    Trail.find({}, (err, trails) => {
        res.json(trails)
    })
}

// New = render form to create new trail
let showNewTrailForm = (req, res) => {
    res.send('Create New Trail Form')
}

// Create = create a new trail in the database
let create = async (req, res) => {
    try {
        // Call cloudinary to get the cloudinary image attributes
        const result = await cloudinary.uploader.upload(req.file.path)

        let newTrail = new Trail({
            name: req.body.name,
            location: req.body.location,
            difficulty: req.body.difficulty,
            length: req.body.length,
            elevationChange: req.body.elevationChange,
            routeType: req.body.routeType,
            description: req.body.description,
            // Pull image and cloudinary_id out of result above
            image: result.secure_url,
            cloudinary_id: result.public_id
        })
        // Console.log the new trail
        console.log(newTrail)
        // Save the new trail to the database
        await newTrail.save();
        res.json(newTrail);
    } catch (err) {
        console.log(err);
    }
}

// Show = show details of one trail
let show = (req, res) => {
    Trail.findById(req.params.id, (err, trail) => {
        if(err){
            res.status(400).json(err)
            return
        }uu
        console.log(trail)
        res.json(trail)
    })
}

// Edit = render form to edit a trail
let showEditTrailForm = (req, res) => {
    res.send('Show Edit Trail Form')
}

// CC: I'M GETTING AN ERROR IN POSTMAN WITH THIS ROUTE/FUNCTION
// CC: IT SAYS CANNOT REMOVE HEADERS AFTER THEY ARE SENT
// Update = update a trail in the database
let update = async (req, res) => {
    if (req.file) {
        // If an image is submitted to update, use cloudinary to update attributes
        const result = await cloudinary.uploader.upload(req.file.path)
        req.body["image"] = result.secure_url
        req.body["cloudinary_id"] = result.public_id
    } else {
        // Otherwise delete the image from the update
        delete req.body["image"]
    }
    // Console.log the form data
    // CC: FOR SOME REASON THIS IS EMPTY WHEN I TEST IN POSTMAN
    console.log('req.body:', req.body)
    await Trail.findByIdAndUpdate(req.params.id, req.body)
}

// CC: THIS METHOD DELETES THE ENTRY FROM THE DB BUT CRASHES THE APP
// CC: IT SAYS CANNOT REMOVE HEADERS AFTER THEY ARE SENT TO THE CLIENT
// Delete = delete a trail in the database
let deleteTrail = async (req, res) => {
    try {
        let trail = await Trail.findById(req.params.id);
        // Delete image from cloudinary
        await cloudinary.uploader.destroy(trail.cloudinary_id);
        // Delete attraction from database
        await trail.remove();
    } catch (err) {
        console.log(err)
    }
}

module.exports = {
    index,
    showNewTrailForm,
    create,
    show,
    showEditTrailForm,
    update,
    deleteTrail
}