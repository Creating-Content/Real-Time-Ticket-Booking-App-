// Importing the 'mongoose' library and assigning it to the 'mongoose' variable.
const mongoose = require('mongoose');

// Creating a new mongoose schema for the 'users' collection in the database.
const userSchema = new mongoose.Schema({
    // 'name' field in the schema with the type 'String' and it is required (must be provided).
    name: {
        type: String,
        required: true,
    },
    // 'email' field in the schema with the type 'String' and it is required and unique (no duplicate values allowed).
    email: {
        type: String,
        required: true,
        unique: true,
    },
    // 'password' field in the schema with the type 'String' and it is required.
    password: {
        type: String,
        required: true,
    },
    // 'isAdmin' field in the schema with the type 'Boolean', it is required, and its default value is set to 'false'.
    isAdmin: {
        type: Boolean,
        required: true,
        default: false,
    },
},
    // Options object for the schema.
    {
        // 'timestamps' option set to 'true', automatically adds 'createdAt' and 'updatedAt' fields to the documents.
        timestamps: true,
    }
);

// Exporting the model based on the user schema. This allows using the schema to interact with the 'users' collection.
module.exports = mongoose.model('users', userSchema);