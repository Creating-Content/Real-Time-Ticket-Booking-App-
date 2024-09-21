// Import the createSlice function from the Redux Toolkit library
import { createSlice } from "@reduxjs/toolkit";

// Create a new slice of the Redux state named "users"
const usersSlice = createSlice({
  name: "users", // Name of the slice used to generate action types and action creators
  initialState: {
    user: null, // Initial state with the 'user' property set to null
  },
  reducers: {
    // Reducer function named 'SetUser'
    SetUser: (state, action) => {
      state.user = action.payload; // Update the 'user' property with the payload data
    },
  },
});

// Export the 'SetUser' action creator from the slice
export const { SetUser } = usersSlice.actions;

// Export the reducer function of the 'users' slice as the default export of this module
export default usersSlice.reducer;