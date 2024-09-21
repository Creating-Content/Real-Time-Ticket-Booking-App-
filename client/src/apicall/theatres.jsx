// Import the axiosInstance object from an external module or file.
import { axiosInstance } from ".";

// Add a new theatre
// Define an asynchronous function to add a new theatre.
export const addTheatre = async (payload) => {
  try {
    // Send an HTTP POST request to add a theatre using the provided payload.
    const response = await axiosInstance.post(
      "/api/theatres/add-theatre",
      payload
    );
    // If the request is successful, return the response data from the server.
    return response.data;
  } catch (error) {
    // If an error occurs, return the response object from the error.
    // This may include information about the error status and message.
    return error.response;
  }
};

// get all theatres
// Define an asynchronous function to get a list of all theatres.
export const GetAllTheatres = async () => {
  try {
    // Send an HTTP GET request to retrieve a list of all theatres.
    const response = await axiosInstance.get("/api/theatres/get-all-theatres");
    // If the request is successful, return the response data from the server.
    return response.data;
  } catch (error) {
    // If an error occurs, return the response object from the error.
    // This may include information about the error status and message.
    return error.response;
  }
};

// get all theatres by owner
// Define an asynchronous function to get a list of theatres based on the owner.
export const GetAllTheatresByOwner = async (payload) => {
  try {
    // Send an HTTP POST request with the provided payload to retrieve theatres by owner.
    const response = await axiosInstance.post(
      "/api/theatres/get-all-theatres-by-owner",
      payload
    );
    // If the request is successful, return the response data from the server.
    return response.data;
  } catch (error) {
    // If an error occurs, return the response object from the error.
    // This may include information about the error status and message.
    return error.response;
  }
};

// update theatre
// Define an asynchronous function to update theatre information.
export const updateTheatre = async (payload) => {
  try {
    // Send an HTTP POST request with the provided payload to update theatre information.
    const response = await axiosInstance.post(
      "/api/theatres/update-theatre",
      payload
    );
    // If the request is successful, return the response data from the server.
    return response.data;
  } catch (error) {
    // If an error occurs, return the response object from the error.
    // This may include information about the error status and message.
    return error.response;
  }
};

// delete theatre
// Define an asynchronous function to delete a theatre.
export const DeleteTheatre = async (payload) => {
  try {
    // Send an HTTP POST request with the provided payload to delete a theatre.
    const response = await axiosInstance.post(
      "/api/theatres/delete-theatre",
      payload
    );
    // If the request is successful, return the response data from the server.
    return response.data;
  } catch (error) {
    // If an error occurs, return the response object from the error.
    // This may include information about the error status and message.
    return error.response;
  }
};

// Add show
// Define an asynchronous function to add a show.
export const AddShow = async (payload) => {
  try {
    // Send an HTTP POST request with the provided payload to add a show.
    const response = await axiosInstance.post(
      "/api/theatres/add-show",
      payload
    );
    // If the request is successful, return the response data from the server.
    return response.data;
  } catch (error) {
    // If an error occurs, return the response object from the error.
    // This may include information about the error status and message.
    return error.response;
  }
};

// get all shows by theatre
// Define an asynchronous function to get a list of shows based on the theatre.
export const GetAllShowsByTheatre = async (payload) => {
  try {
    // Send an HTTP POST request with the provided payload to get all shows by theatre.
    const response = await axiosInstance.post(
      "/api/theatres/get-all-shows-by-theatre",
      payload
    );
    // If the request is successful, return the response data from the server.
    return response.data;
  } catch (error) {
    // If an error occurs, return the response object from the error.
    // This may include information about the error status and message.
    return error.response;
  }
};

// delete show
// Define an asynchronous function to delete a show.
export const DeleteShow = async (payload) => {
  try {
    // Send an HTTP POST request with the provided payload to delete a show.
    const response = await axiosInstance.post(
      "/api/theatres/delete-show",
      payload
    );
    // If the request is successful, return the response data from the server.
    return response.data;
  } catch (error) {
    // If an error occurs, return the response object from the error.
    // This may include information about the error status and message.
    return error.response;
  }
};

// get all theatres for a movie
// Define an asynchronous function to get a list of theatres based on the movie.
export const GetAllTheatresByMovie = async (payload) => {
  try {
    // Send an HTTP POST request with the provided payload to get all theatres by movie.
    const response = await axiosInstance.post(
      "/api/theatres/get-all-theatres-by-movie",
      payload
    );
    // If the request is successful, return the response data from the server.
    return response.data;
  } catch (error) {
    // If an error occurs, return the response object from the error.
    return error.response;
  }
};

// get show by id
// Define an asynchronous function to get a show by id.
export const GetShowById = async (payload) => {
  try {
    // Send an HTTP POST request with the provided payload to get a show by id.
    const response = await axiosInstance.post(
      "/api/theatres/get-show-by-id",
      payload
    );
    // If the request is successful, return the response data from the server.
    return response.data;
  } catch (error) {
    // If an error occurs, return the response object from the error.
    return error.response;
  }
};