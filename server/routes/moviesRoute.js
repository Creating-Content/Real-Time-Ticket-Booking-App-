// Import the Express router module
const router = require('express').Router();

// Import the Movie model from the movieModel module
const Movie = require('../models/movieModel');

// Import the authentication middleware from authMiddleware module
const authMiddleware = require('../middlewares/authMiddleware');

// Add a new movie
// Route handler for adding a new movie
router.post('/add-movie', authMiddleware, async (req, res) => {
    try {
        // Create a new Movie instance using the data from the request body
        const newMovie = new Movie(req.body);

        // Asynchronously save the new movie to the database
        await newMovie.save();

        // Send a success response with a message indicating the movie was added
        res.send({
            success: true,
            message: 'Movie added successfully',
        });
    } catch (error) {
        // If an error occurs, send a failure response with the error message
        res.send({
            success: false,
            message: error.message,
        });
    }
});

// Get all movies
// Route handler for getting all movies
router.get('/get-all-movies', async (req, res) => {
    try {
        // Fetch all movies from the database, sorted by createdAt in descending order
        const movies = await Movie.find().sort({ createdAt: -1 });

        // Send a success response with the fetched movies
        res.send({
            success: true,
            message: 'Movies fetched successfully',
            data: movies,
        });
    } catch (error) {
        // If an error occurs, send a failure response with the error message
        res.send({
            success: false,
            message: error.message,
        });
    }
});

// update a movie
// Route handler for updating a movie
router.post("/update-movie", authMiddleware, async (req, res) => {
    try {
        // Find a movie by its ID and update its data with the request body
        await Movie.findByIdAndUpdate(req.body.movieId, req.body);

        // Send a success response indicating the movie was updated
        res.send({
            success: true,
            message: 'Movie updated successfully',
        });
    } catch (error) {
        // If an error occurs, send a failure response with the error message
        res.send({
            success: false,
            message: error.message,
        });
    }
});

// delete a movie
// Route handler for deleting a movie
router.post("/delete-movie", authMiddleware, async (req, res) => {
    try {
        // Find a movie by its ID and delete it
        await Movie.findByIdAndDelete(req.body.movieId);

        // Send a success response indicating the movie was deleted
        res.send({
            success: true,
            message: 'Movie deleted successfully',
        });
    } catch (error) {
        // If an error occurs, send a failure response with the error message
        res.send({
            success: false,
            message: error.message,
        });
    }
});

// get a movie by id
// Route handler for getting a movie by its ID
router.get("/get-movie-by-id/:id", async (req, res) => {
    try {
        // Find a movie by its ID
        const movie = await Movie.findById(req.params.id);

        // Send a success response with the fetched movie
        res.send({
            success: true,
            message: 'Movie fetched successfully',
            data: movie,
        });
    } catch (error) {
        // If an error occurs, send a failure response with the error message
        res.send({
            success: false,
            message: error.message,
        });
    }
});


// Export the router to be used in the application
module.exports = router;