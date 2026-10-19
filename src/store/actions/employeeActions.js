import { createAsyncThunk } from '@reduxjs/toolkit';

// GET /api/employees. Успешный ответ — массив сотрудников.
export const fetchEmployees = createAsyncThunk(
  'employee/fetchEmployees',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch('/api/employees');
      const data = await response.json().catch(() => null);

      if (!response.ok) {
        return rejectWithValue(data?.message || 'Не удалось загрузить сотрудников');
      }

      return data;
    } catch (error) {
      return rejectWithValue(error.message || 'Не удалось загрузить сотрудников');
    }
  },
);

// POST /api/employees. Тело запроса — поля нового сотрудника.
export const addEmployee = createAsyncThunk(
  'employee/addEmployee',
  async (employee, { rejectWithValue }) => {
    try {
      const response = await fetch('/api/employees', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(employee),
      });
      const data = await response.json().catch(() => null);

      if (!response.ok) {
        return rejectWithValue(data?.message || 'Не удалось добавить сотрудника');
      }

      return data;
    } catch (error) {
      return rejectWithValue(error.message || 'Не удалось добавить сотрудника');
    }
  },
);
