
import {configureStore} from '@reduxjs/toolkit';
import loginReducer from '../features/slices/authSlice';

export const store = configureStore({
    reducer: loginReducer,
});

