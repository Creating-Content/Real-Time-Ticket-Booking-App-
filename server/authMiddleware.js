// Importing the 'jsonwebtoken' module and assigning it to the 'jwt' constant.
const jwt = require('jsonwebtoken');

// Exporting a middleware function that takes three arguments: 'req' (request), 'res' (response), and 'next' (callback function).
module.exports = function (req, res, next) {
    // The 'try' block is used to handle any potential exceptions that may occur during the execution of the code within the block.
    try {
        // Extracting the token from the 'Authorization' header in the request. The header value is expected to be in the format 'Bearer <token>'.
        const token = req.headers.authorization.split(" ")[1];

        // Verifying the authenticity and integrity of the extracted JWT using the secret defined in the 'jwt_secret' environment variable.
        const decoded = jwt.verify(token, process.env.jwt_secret);

        // Adding the 'userId' from the decoded JWT payload to the 'req.body' object so that other middleware or route handlers can access it later.
        req.body.userId = decoded.userId;

        // Calling the 'next()' function to pass control to the next middleware or route handler in the chain.
        next();
    } catch (error) {
        // If any errors occur during the execution of the code within the 'try' block, the 'catch' block will catch those errors and allow us to handle them.

        // Sending an HTTP 401 Unauthorized response with a JSON object containing an error message.
        res.status(401).send({ success: false, message: "Invalid token" });
    }
    // This line marks the end of the middleware function.
}