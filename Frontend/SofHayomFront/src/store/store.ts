import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice'
import authReducer from './slices/authSlice';
import businessReducer from './slices/businessSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    auth: authReducer,
    business: businessReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
