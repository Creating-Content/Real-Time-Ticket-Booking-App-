// Import the Express router module
const router = require('express').Router();

// Import the authentication middleware
const authMiddleware = require('../middlewares/authMiddleware');

// Import the Theatre model
const Theatre = require('../models/theatreModel');

// Import the Show model
const Show = require('../models/showModel');

// add theatre
// Define a POST route to add a new theatre
router.post('/add-theatre', authMiddleware, async (req, res) => {
    try {
        // Create a new Theatre instance using request body data
        const newTheatre = new Theatre(req.body);

        // Save the new theatre to the database
        await newTheatre.save();

        // Send a success response
        res.send({
            success: true,
            message: 'Theatre added successfully',
        });
    } catch (error) {
        // Send an error response if an exception occurs
        res.send({
            success: false,
            message: error.message,
        });
    }
});

// get all theatres
// Define a GET route to get all theatres
router.get("/get-all-theatres", authMiddleware, async (req, res) => {
    try {
        // Find all theatres from the database and sort them by creation date
        const theatres = await Theatre.find().sort({ createdAt: -1 });

        // Send a success response with the theatre data
        res.send({
            success: true,
            data: theatres,
        });
    } catch (error) {
        // Send an error response if an exception occurs
        res.send({
            success: false,
            message: error.message,
        });
    }
});

// get theatre by owner
// Define a POST route to get all theatres owned by a specific owner
router.post("/get-all-theatres-by-owner", authMiddleware, async (req, res) => {
    try {
        // Find theatres owned by the specified owner and sort them by creation date
        const theatres = await Theatre.find({ owner: req.body.owner }).sort({ createdAt: -1 });

        // Send a success response with the theatre data
        res.send({
            success: true,
            message: 'Theatres fetched successfully',
            data: theatres,
        });
    } catch (error) {
        // Send an error response if an exception occurs
        res.send({
            success: false,
            message: error.message,
        });
    }
});

// update theatre
// Define a POST route to update a theatre
router.post("/update-theatre", authMiddleware, async (req, res) => {
    try {
        // Update the theatre with the specified theatreId using the request body data
        await Theatre.findByIdAndUpdate(req.body.theatreId, req.body);

        // Send a success response
        res.send({
            success: true,
            message: 'Theatre updated successfully',
        });
    } catch (error) {
        // Send an error response if an exception occurs
        res.send({
            success: false,
            message: error.message,
        });
    }
});

// delete theatre
// Define a POST route to delete a theatre
router.post("/delete-theatre", authMiddleware, async (req, res) => {
    try {
        // Delete the theatre with the specified theatreId
        await Theatre.findByIdAndDelete(req.body.theatreId);

        // Send a success response
        res.send({
            success: true,
            message: 'Theatre deleted successfully',
        });
    } catch (error) {
        // Send an error response if an exception occurs
        res.send({
            success: false,
            message: error.message,
        });
    }
});


// add show
// Define a POST route to add a new show
router.post("/add-show", authMiddleware, async (req, res) => {
    try {
        // Create a new Show instance using request body data
        const newShow = new Show(req.body);

        // Save the new show to the database
        await newShow.save();

        // Send a success response
        res.send({
            success: true,
            message: 'Show added successfully',
        });
    } catch (error) {
        // Send an error response if an exception occurs
        res.send({
            success: false,
            message: error.message,
        });
    }
});

// get all shows by theatre
// Define a POST route to get all shows by a specific theatre
router.post("/get-all-shows-by-theatre", authMiddleware, async (req, res) => {
    try {
        // Find all shows by the specified theatreId and sort them by creation date
        const shows = await Show.find({ theatre: req.body.theatreId }).populate('movie').sort({ createdAt: -1 });

        // Send a success response with the show data
        res.send({
            success: true,
            message: 'Shows fetched successfully',
            data: shows,
        });
    } catch (error) {
        // Send an error response if an exception occurs
        res.send({
            success: false,
            message: error.message,
        });
    }
});

// delete show
// Define a POST route to delete a show
router.post("/delete-show", authMiddleware, async (req, res) => {
    try {
        // Delete the show with the specified showId
        await Show.findByIdAndDelete(req.body.showId);

        // Send a success response
        res.send({
            success: true,
            message: 'Show deleted successfully',
        });
    } catch (error) {
        // Send an error response if an exception occurs
        res.send({
            success: false,
            message: error.message,
        });
    }
});

// get all unique theatres which have shows of a movie
// Define a POST route to get all unique theatres which have shows of a movie
router.post("/get-all-theatres-by-movie", authMiddleware, async (req, res) => {

    try {
        // get movie and date from request body
        const { movie, date } = req.body;

        // find all shows of a movie
        const shows = await Show.find({ movie, date }).populate("theatre").sort({ createdAt: -1 });

        // get all unique theatres
        let uniqueTheatres = [];
        shows.forEach((show) => {
            const theatre = uniqueTheatres.find((theatre) => theatre._id === show.theatre._id);

            // if theatre is not present in uniqueTheatres array, add it
            if (!theatre) {
                const showsForThisTheatre = shows.filter(
                    (showObj) => showObj.theatre._id == show.theatre._id
                );
                uniqueTheatres.push({
                    ...show.theatre._doc,
                    shows: showsForThisTheatre,
                });
            }

        });

        // Send a success response with the theatre data
        res.send({
            success: true,
            message: 'Theatres fetched successfully',
            data: uniqueTheatres,
        });

    } catch (error) {
        // Send an error response if an exception occurs
        res.send({
            success: false,
            message: error.message,
        });
    }

});

// get show by id
// Define a POST route to get a show by id
router.post("/get-show-by-id", authMiddleware, async (req, res) => {
    try {
        // Find the show with the specified showId
        const show = await Show.findById(req.body.showId).populate('movie').populate('theatre');
        // Send a success response with the show data
        res.send({
            success: true,
            message: 'Show fetched successfully',
            data: show,
        });
    } catch (error) {
        // Send an error response if an exception occurs
        res.send({
            success: false,
            message: error.message,
        });
    }
});

// Export the router to be used in other parts of the application
module.exports = router;