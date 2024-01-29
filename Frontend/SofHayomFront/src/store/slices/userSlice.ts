// userSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../utils/api';

interface User {
  id: number;
  username: string;
  email: string;
  // add other user properties as needed
}

interface UserState {
  userData: User | null;
  loading: boolean;
  error: string | null;
}

interface AuthState {
  isAuthenticated: boolean;
  userRole: number | null;
  token: string | null;
  isBusinessAuthorized: boolean | null;
  loading: boolean;
  error: string | null;
}

export const fetchUserData = createAsyncThunk<User, number, { rejectValue: string }>(
  'user/fetchUserData',
  async (userId, { rejectWithValue }) => {
    try {
      const response = await api.get(`/users/${userId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const initialState: UserState = {
  userData: null,
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // Reducers for other user actions
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserData.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUserData.fulfilled, (state, action) => {
        state.userData = action.payload;
        state.loading = false;
      })
      .addCase(fetchUserData.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      });
  },
});

export const { /* export any reducers */ } = userSlice.actions;
export default userSlice.reducer;
