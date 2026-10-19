import { createAsyncThunk } from '@reduxjs/toolkit';

// POST /api/login. В слайс попадают user и token, ошибка уходит в rejectWithValue.
export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json().catch(() => null);

      if (!response.ok) {
        return rejectWithValue(data?.message || 'Не удалось войти');
      }

      // logoutUser чистит эти ключи, поэтому сохраняем их здесь, а не в reducer.
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));

      return { user: data.user, token: data.token };
    } catch (error) {
      return rejectWithValue(error.message || 'Не удалось войти');
    }
  },
);

// Сессия живёт только в localStorage. Слайс обнулит user/token по fulfilled.
export const logoutUser = createAsyncThunk('auth/logoutUser', async () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  return null;
});
