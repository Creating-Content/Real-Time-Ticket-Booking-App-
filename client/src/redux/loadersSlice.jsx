// Import the createSlice function from the Redux Toolkit library.
import { createSlice } from "@reduxjs/toolkit";

// Create a Redux slice named "loaders" with initial state.
const loadersSlice = createSlice({
  // The name of the slice in the Redux store.
  name: "loaders",

  // The initial state of the slice.
  initialState: {
    loading: false,
  },

  // Define reducers to update the state in response to actions.
  reducers: {
    // Reducer to set the 'loading' state to true.
    ShowLoading: (state) => {
      state.loading = true;
    },

    // Reducer to set the 'loading' state to false.
    HideLoading: (state) => {
      state.loading = false;
    },
  },
});

// Export the action creators.
export const { ShowLoading, HideLoading } = loadersSlice.actions;

// Export the reducer function to handle state updates for the slice.
export default loadersSlice.reducer;