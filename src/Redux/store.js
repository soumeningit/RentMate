import { configureStore } from '@reduxjs/toolkit';
import profileReducer from './slices/profileSlice';
import authReducer from './slices/authSlice';
import paymentReducer from './slices/paymentSlice';

export default configureStore({
    reducer: {
        profile: profileReducer,
        auth: authReducer,
        payment: paymentReducer
    },
})