// Import required modules and packages
const router = require('express').Router(); // Import the Express Router to define routes
const User = require('../models/userModel'); // Import the User model for interacting with user data
const bcrypt = require('bcryptjs'); // Import the bcrypt library for hashing passwords securely
const jwt = require('jsonwebtoken'); // Import the jsonwebtoken library for working with JSON Web Tokens (JWTs)
const authMiddleware = require('../middlewares/authMiddleware'); // Import the authMiddleware for authenticating routes

// Register a new user
router.post('/register', async (req, res) => {
    try {
        // Check if user already exists
        const userExists = await User.findOne({ email: req.body.email });
        if (userExists) {
            // If user exists, send a response indicating that user already exists
            return res.send({
                success: false,
                message: 'User already exists',
            });
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10); // Generate a salt for password hashing
        const hashedPassword = await bcrypt.hash(req.body.password, salt); // Hash the user's password
        req.body.password = hashedPassword; // Update the password in the request body with the hashed password

        // Save the user to the database
        const newUser = new User(req.body); // Create a new User instance with the user data from the request
        await newUser.save(); // Save the new user to the database

        // Send a response indicating successful user creation
        res.send({ success: true, message: 'User created successfully' });

    } catch (error) {
        // If an error occurs, send an error response
        res.send({
            success: false,
            message: error.message,
        });
    }
});

// Login a user
router.post('/login', async (req, res) => {
    try {
        // Check if user exists
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            // If user does not exist, send a response indicating user does not exist
            return res.send({
                success: false,
                message: 'User does not exist',
            });
        }

        // Check if password is correct
        const validPassword = await bcrypt.compare(
            req.body.password,
            user.password
        );
        if (!validPassword) {
            // If password is invalid, send a response indicating invalid password
            return res.send({
                success: false,
                message: 'Invalid password',
            });
        }

        // Create and assign a token using JWT
        const token = jwt.sign({ userId: user._id }, process.env.jwt_secret, {
            expiresIn: '1d', // Token expires in 1 day
        });

        // Send a response indicating successful login along with the generated token
        res.send({
            success: true,
            message: 'User logged in successfully',
            data: token,
        });

    } catch (error) {
        // If an error occurs, send an error response
        res.send({
            success: false,
            message: error.message,
        });
    }
});

// Get user details by id
router.get('/get-current-user', authMiddleware, async (req, res) => {
    try {
        // Fetch user details from the database using the userId extracted from the request
        const user = await User.findById(req.body.userId).select("-password");

        // Send a response with the user details excluding the password field
        res.send({
            success: true,
            message: "User details fetched successfully",
            data: user,
        });
    } catch (error) {
        // If an error occurs, send an error response
        res.send({
            success: false,
            message: error.message,
        });
    }
});

// Export the router object to be used in other parts of the application
module.exports = router;