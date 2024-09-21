// Importing the axios library, which simplifies making HTTP requests.
import axios from 'axios';

// Creating a customized instance of axios with default settings.
// This instance will be used for making HTTP requests throughout the application.
export const axiosInstance = axios.create({
  // Setting the headers property to include additional metadata in the request.
  headers: {
    // Setting the 'Content-Type' header to 'application/json'.
    // Indicates that the data being sent in the request body is in JSON format.
    'Content-Type': 'application/json',

    // Setting the 'authorization' header with a bearer token.
    // The token is retrieved from the browser's 'localStorage'.
    // A bearer token is often used for authentication purposes.
    // It allows the server to identify and validate the user making the request.
    // The `${...}` syntax is used for string interpolation to embed the token value.
    // The 'localStorage.getItem('token')' retrieves the token value from the browser's localStorage.
    authorization: `Bearer ${localStorage.getItem('token')}`,
  }
});