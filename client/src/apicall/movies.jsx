// Import the 'axiosInstance' object from the current module (assuming it's defined in the imported module).
const { axiosInstance } = require(".");

// Add a new movie function (admin only)
export const AddMovie = async (payload) => {
  try {
    // Send a POST request to the "/api/movies/add-movie" endpoint with the provided payload.
    const response = await axiosInstance.post("/api/movies/add-movie", payload);
    // If the request is successful (status code 2xx), return the data from the response.
    return response.data;
  } catch (error) {
    // If an error occurs during the request, return the response from the error object.
    // This may include the status code, headers, and possibly an error message from the server.
    return error.response;
  }
};

// get all movies function (admin and user)
export const GetAllMovies = async () => {
  try {
    // Send a GET request to the "/api/movies/get-all-movies" endpoint.
    const response = await axiosInstance.get("/api/movies/get-all-movies");
    // If the request is successful (status code 2xx), return the data from the response.
    return response.data;
  } catch (error) {
    // If an error occurs during the request, return the response from the error object.
    // This may include the status code, headers, and possibly an error message from the server.
    return error.response;
  }
};

// update movie function (admin only)
export const UpdateMovie = async (payload) => {
  try {
    // Send a POST request to the "/api/movies/update-movie" endpoint with the provided payload.
    const response = await axiosInstance.post(
      "/api/movies/update-movie",
      payload
    );
    // If the request is successful (status code 2xx), return the data from the response.
    return response.data;
  } catch (error) {
    // If an error occurs during the request, return the response from the error object.
    // This may include the status code, headers, and possibly an error message from the server.
    return error.response;
  }
};

// delete movie function (admin only)
export const DeleteMovie = async (payload) => {
  try {
    // Send a POST request to the "/api/movies/delete-movie" endpoint with the provided payload.
    const response = await axiosInstance.post(
      "/api/movies/delete-movie",
      payload
    );
    // If the request is successful (status code 2xx), return the data from the response.
    return response.data;
  } catch (error) {
    // If an error occurs during the request, return the response from the error object.
    // This may include the status code, headers, and possibly an error message from the server.
    return error.response;
  }
};

// get movie by id function (admin and user)
export const GetMovieById = async (id) => {
  try {
    // Send a GET request to the "/api/movies/get-movie-by-id" endpoint with the provided id.
    const response = await axiosInstance.get(
      `/api/movies/get-movie-by-id/${id}`
    );
    // If the request is successful (status code 2xx), return the data from the response.
    return response.data;
  } catch (error) {
    // If an error occurs during the request, return the response from the error object.
    // This may include the status code, headers, and possibly an error message from the server.
    return error.response;
  }
}