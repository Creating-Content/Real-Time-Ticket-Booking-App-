// Importing the 'configureStore' function from the Redux Toolkit library.
import { configureStore } from "@reduxjs/toolkit";

// Importing the 'loadersReducer' from the './loadersSlice' file.
// This suggests that the application uses a separate Redux slice for handling loader-related state.
import loadersReducer from "./loadersSlice";

// Importing the 'usersReducer' from the './usersSlice' file.
// This suggests that the application uses a separate Redux slice for handling user-related state.
import usersReducer from "./usersSlice";

// Creating a Redux store using the 'configureStore' function.
// The store will hold the complete state tree of the application.
const store = configureStore({
  // Configuring the store with the root reducer.
  // The root reducer is a combination of all the individual reducers used in the application.
  reducer: {
    // Assigning 'loadersReducer' to the 'loaders' key in the root reducer.
    loaders: loadersReducer,

    // Assigning 'usersReducer' to the 'users' key in the root reducer.
    users: usersReducer,
  },
});

// Exporting the configured Redux store.
// This allows other parts of the application to import and interact with the global state using Redux methods.
export default store;