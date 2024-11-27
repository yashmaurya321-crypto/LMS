import { createSlice } from '@reduxjs/toolkit';

// Create a slice for user state
const userSlice = createSlice({
  name: 'user',
  initialState: {
    userInfo: JSON.parse(localStorage.getItem('user')) || null,
  },
  reducers: {
    
    login: (state, action) => {
      state.userInfo = action.payload;
    },
    logout: (state) => {
      state.userInfo = null;
    },
  },
});

// Export actions for use in components
export const { login, logout } = userSlice.actions;

// Export the reducer to be used in the store
export default userSlice.reducer;
