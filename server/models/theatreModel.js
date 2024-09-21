// Import the Mongoose library, which is an Object Data Modeling (ODM) library for MongoDB and Node.js.
const mongoose = require('mongoose');

// Define a new Mongoose schema for a theatre entity.
const theatreSchema = new mongoose.Schema({
    // Define a field named 'name' with type 'String', and it's marked as required.
    name: {
        type: String,
        required: true, // This field must be present when creating a document.
    },
    // Define a field named 'address' with type 'String', and it's marked as required.
    address: {
        type: String,
        required: true, // This field must be present when creating a document.
    },
    // Define a field named 'phone' with type 'String', and it's marked as required.
    phone: {
        type: String,
        required: true, // This field must be present when creating a document.
    },
    // Define a field named 'email' with type 'String', and it's marked as required.
    email: {
        type: String,
        required: true, // This field must be present when creating a document.
    },
    // Define a field named 'owner' with type 'ObjectId' (a MongoDB identifier), and it references a 'users' collection.
    owner: {
        type: mongoose.Schema.Types.ObjectId, // This field holds a reference to another document.
        ref: 'users', // This specifies the referenced collection name.
    },
    // Define a field named 'isActive' with type 'Boolean', and it has a default value of 'false'.
    isActive: {
        type: Boolean,
        default: false, // If not specified when creating a document, this field will default to 'false'.
    },
}, {
    // Provide additional configuration options for the schema.
    timestamps: true, // This adds 'createdAt' and 'updatedAt' fields to track document creation and modification times.
});

// Create a Mongoose model named 'theatres' based on the defined schema.
module.exports = mongoose.model('theatres', theatreSchema);