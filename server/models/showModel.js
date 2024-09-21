// Importing the 'mongoose' library to interact with MongoDB.
const mongoose = require('mongoose');

// Defining a new schema for the 'shows' collection in the database.
const showSchema = new mongoose.Schema({
    // Defining the 'name' field of type String which is required for each document.
    name: {
        type: String,
        required: true,
    },
    // Defining the 'date' field of type Date which is required for each document.
    date: {
        type: Date,
        required: true,
    },
    // Defining the 'time' field of type String which is required for each document.
    time: {
        type: String,
        required: true,
    },
    // Defining the 'movie' field of type ObjectId, referencing the 'movies' collection,
    // and it is required for each document.
    movie: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'movies', // Referencing the 'movies' collection
        required: true,
    },
    // Defining the 'ticketPrice' field of type Number which is required for each document.
    ticketPrice: {
        type: Number,
        required: true,
    },
    // Defining the 'totalSeats' field of type Number which is required for each document.
    totalSeats: {
        type: Number,
        required: true,
    },
    // Defining the 'bookedSeats' field of type Array with a default empty array.
    bookedSeats: {
        type: Array,
        default: [],
    },
    // Defining the 'theatre' field of type ObjectId, referencing the 'theatres' collection,
    // and it is required for each document.
    theatre: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'theatres', // Referencing the 'theatres' collection
        required: true,
    },
}, {
    timestamps: true // Adding timestamps to automatically record 'createdAt' and 'updatedAt'.
});

// Creating a model named 'Show' using the 'showSchema'.
const Show = mongoose.model('shows', showSchema);

// Exporting the 'Show' model for use in other parts of the application.
module.exports = Show;