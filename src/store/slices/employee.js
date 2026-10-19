import { createSlice } from '@reduxjs/toolkit';
import { addEmployee, fetchEmployees } from '../actions/employeeActions';

const initialState = {
  employees: [],
  loading: false,
  error: null,
};

// Список меняется только ответами thunk-экшенов, не локальными reducers.
const employeeSlice = createSlice({
  name: 'employee',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchEmployees.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchEmployees.fulfilled, (state, action) => {
        state.loading = false;
        state.employees = action.payload;
      })
      .addCase(fetchEmployees.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? 'Не удалось загрузить сотрудников';
      })
      .addCase(addEmployee.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addEmployee.fulfilled, (state, action) => {
        state.loading = false;
        state.employees.push(action.payload);
      })
      .addCase(addEmployee.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? 'Не удалось добавить сотрудника';
      });
  },
});

export default employeeSlice.reducer;
