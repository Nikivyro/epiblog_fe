import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import inputReducer from './inputReducer';

const store = configureStore({
  reducer: {
    user: userReducer,
    search: inputReducer
  },
});

export default store;