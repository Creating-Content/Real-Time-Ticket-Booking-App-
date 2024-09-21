// Import the 'axiosInstance' object from the current module (assuming it's defined in the imported module).
const { axiosInstance } = require(".");

// Register a new user function
export const RegisterUser = async (payload) => {
    try {
        // Send a POST request to the "/api/users/register" endpoint with the provided payload.
        const response = await axiosInstance.post("/api/users/register", payload);
        // If the request is successful (status code 2xx), return the data from the response.
        return response.data;
    } catch (error) {
        // If an error occurs during the request, return the response from the error object.
        // This may include the status code, headers, and possibly an error message from the server.
        return error.response;
    }
};

// Login a user function
export const LoginUser = async (payload) => {
    try {
        // Send a POST request to the "/api/users/login" endpoint with the provided payload.
        const response = await axiosInstance.post("/api/users/login", payload);
        // If the request is successful (status code 2xx), return the data from the response.
        return response.data;
    } catch (error) {
        // If an error occurs during the request, return the response from the error object.
        // This may include the status code, headers, and possibly an error message from the server.
        return error.response;
    }
}

// Get the current user function
export const GetCurrentUser = async () => {
    try {
        // Send a GET request to the "/api/users/get-current-user" endpoint.
        const response = await axiosInstance.get("/api/users/get-current-user");
        // If the request is successful (status code 2xx), return the data from the response.
        return response.data;
    } catch (error) {
        // If an error occurs during the request, return the error object itself.
        // This may include information about the error that occurred.
        return error;
    }
}