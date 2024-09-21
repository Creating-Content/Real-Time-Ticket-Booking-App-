// Importing the Mongoose library, which is a popular Node.js library used for MongoDB object modeling and interacting with the MongoDB database.
const mongoose = require('mongoose');

// Setting a Mongoose option called 'strictQuery' to 'false'.
// By default, Mongoose will throw an error if you try to query the database with properties that are not defined in your schema.
// Setting 'strictQuery' to 'false' allows you to perform queries with properties that are not explicitly defined in the schema without triggering an error.
mongoose.set('strictQuery', false);

// Establishing a connection to the MongoDB database using the 'mongoose.connect' method.
// The connection URL is fetched from the environment variable 'mongo_url' using 'process.env'.
mongoose.connect(process.env.mongo_url);

// Creating a variable named 'connection' and assigning it the Mongoose connection object.
// This connection object represents the connection to the MongoDB database.
const connection = mongoose.connection;

// Setting up an event listener for the 'connected' event of the MongoDB connection.
// When the connection is successfully established, the code inside the callback function (the arrow function) will be executed.
connection.on('connected', () => {
    // Logging the message "Mongo DB Connection Successful!" to the console, indicating that the connection to the MongoDB database was successful.
    console.log('Mongo DB Connection Successful!');
});

// Setting up an event listener for the 'error' event of the MongoDB connection.
// If there is an error while trying to establish the connection, the code inside the callback function will be executed,
// and the error will be passed as the 'err' parameter.
connection.on('error', (err) => {
    // Logging the message "Mongo DB Connection Failed" to the console, indicating that there was an error while trying to connect to the MongoDB database.
    console.log('Mongo DB Connection Failed');
});