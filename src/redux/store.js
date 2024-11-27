import { configureStore } from '@reduxjs/toolkit';
import userReducer from './UserReducer'; // example of a reducer

// Configure the store
const store = configureStore({
  reducer: {
    user: userReducer,
    // You can add more reducers here
  },
});

export default store;
