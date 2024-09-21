// Importing the mongoose library, which is a MongoDB object modeling tool.
const mongoose = require('mongoose');

// Creating a new mongoose schema for the 'movies' collection in the database.
const movieSchema = new mongoose.Schema({
    // Defining a field 'title' with type 'String' and marking it as required.
    title: {
        type: String,
        required: true,
    },
    // Defining a field 'description' with type 'String' and marking it as required.
    description: {
        type: String,
        required: true,
    },
    // Defining a field 'duration' with type 'Number' and marking it as required.
    duration: {
        type: Number,
        required: true,
    },
    // Defining a field 'genre' with type 'String' and marking it as required.
    genre: {
        type: String,
        required: true,
    },
    // Defining a field 'language' with type 'String' and marking it as required.
    language: {
        type: String,
        required: true,
    },
    // Defining a field 'releaseDate' with type 'Date' and marking it as required.
    releaseDate: {
        type: Date,
        required: true,
    },
    // Defining a field 'poster' with type 'String' and marking it as required.
    poster: {
        type: String,
        required: true,
    },
}, {
    // Adding an additional configuration object to the schema with a 'timestamps' property set to true.
    // This will automatically add 'createdAt' and 'updatedAt' fields to each document in the collection.
    timestamps: true
});

// Exporting the compiled mongoose model named 'movies' using the defined movieSchema.
module.exports = mongoose.model('movies', movieSchema);