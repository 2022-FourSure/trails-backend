const Trail = require('../models/Trail');
const Review = require('../models/Review');
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
        console.log(req.file)
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
        console.log(newTrail)
        // Save the new trail to the database
        await newTrail.save();
        res.json(newTrail);
    } catch (err) {
        console.log(err);
    }
}

// Show = show details of one trail
let show = (req, res, next) => {
    Trail.findById(req.params.id)
        .populate('reviews')
        .then((trail) => res.json(trail))
        .catch(next);
};

// Edit = render form to edit a trail
let showEditTrailForm = (req, res) => {
    res.send('Show Edit Trail Form')
}

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
    console.log('req.body:', req.body)
    Trail.findByIdAndUpdate(req.params.id, req.body, (err, item) => {
        if(err){
            res.status(400).json(err)
            return
        }
        Trail.find({}, (error, items) => {
            if(err){
                res.status(400).json(error)
                return
            }
            res.json(items)
        })
    })
}

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
    res.send('Trail has been deleted');
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