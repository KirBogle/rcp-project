import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/auth';
import employeeReducer from './slices/employee';

// configureStore уже подключает middleware для createAsyncThunk.
export const store = configureStore({
  reducer: {
    auth: authReducer,
    employee: employeeReducer,
  },
});
