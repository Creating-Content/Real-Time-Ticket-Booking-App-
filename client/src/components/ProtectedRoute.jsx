// Import necessary dependencies
import { message } from "antd"; // Component for displaying messages or notifications
import React, { useEffect, useState } from "react"; // React hooks for creating functional components and managing state
import { GetCurrentUser } from "../apicalls/users"; // Function to fetch current user's data through an API call
import { useNavigate } from "react-router-dom"; // Hook for programmatic navigation in a React application
import { useDispatch, useSelector } from "react-redux"; // Hooks for accessing the redux store and dispatching redux actions
import { SetUser } from "../redux/usersSlice"; // Redux slice for managing the user state
import { HideLoading, ShowLoading } from "../redux/loadersSlice"; // Redux slice for managing the loading state

// Function component to protect certain routes based on user authentication
function ProtectedRoute({ children }) {
  const { user } = useSelector((state) => state.users); // Access the user state from the redux store
  const navigate = useNavigate(); // Access the navigation function from react-router-dom
  const dispatch = useDispatch(); // Access the dispatch function from the redux store

  // Function to fetch the current user's data from the server
  const getCurrentUser = async () => {
    try {
      dispatch(ShowLoading()); // Dispatch the 'ShowLoading' action to show the loading indicator
      const response = await GetCurrentUser(); // Call the GetCurrentUser API function
      dispatch(HideLoading()); // Dispatch the 'HideLoading' action to hide the loading indicator
      if (response.success) {
        // If API call is successful, set the user state to the response data
        dispatch(SetUser(response.data)); // Dispatch the 'SetUser' action to set the user state to the response data
      } else {
        // If API call fails, set the user state to null and display an error message
        dispatch(SetUser(null)); // Dispatch the 'SetUser' action to set the user state to null
        message.error(response.message);
      }
    } catch (error) {
      // If API call fails, set the user state to null and display an error message
      dispatch(HideLoading()); // Dispatch the 'HideLoading' action to hide the loading indicator
      dispatch(SetUser(null)); // Dispatch the 'SetUser' action to set the user state to null
      message.error(error.message);
    }
  };

  // useEffect hook to fetch current user data when the component is mounted
  useEffect(() => {
    if (localStorage.getItem("token")) {
      // Check if there is a token stored in the localStorage (user is authenticated)
      getCurrentUser(); // Fetch the current user's data from the server
    } else {
      // If no token is found (user is not authenticated), navigate to the login page
      navigate("/login");
    }
  }, []); // The empty dependency array ensures this effect runs only once after mounting

  // Render the content conditionally based on the user state
  return (
    user && ( // If the user state is not null, render the child elements passed to the component
      <div className="layout p-1">
        <div className="header bg-primary flex justify-between p-2">
          <div>
            <h1
              className="text-2xl text-white cursor-pointer"
              onClick={() => navigate("/")}
            >
              BookMyMovie
            </h1>
          </div>
          {/* Display user-related information */}
          <div className="bg-white p-1 flex gap-1">
            <i className="ri-shield-user-line text-primary"></i>
            <h4
              className=" underline"
              onClick={() => {
                if (user.isAdmin) {
                  navigate("/admin");
                } else {
                  navigate("/profile");
                }
              }}
            >
              {user.name} {/* Render the user's name */}
            </h4>
            {/* Logout button */}
            <i
              className="ri-logout-box-r-line ml-2"
              onClick={() => {
                // Handle logout: remove the token from localStorage and navigate to the login page
                localStorage.removeItem("token");
                navigate("/login");
              }}
            ></i>
          </div>
        </div>
        <div className="content mt-1 p-1">
          {children} {/* Render the child elements passed to the component */}
        </div>
      </div>
    )
  );
}

// Export the ProtectedRoute component
export default ProtectedRoute;