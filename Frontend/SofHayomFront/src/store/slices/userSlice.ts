// userSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../utils/api';

interface User {
  profileImage: any;
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

interface UpdateUserData {
  userId: number;
  updates: { [key: string]: any }; // Object with key-value pairs of fields to update
}

interface AuthState {
  isAuthenticated: boolean;
  userRole: number | null;
  token: string | null;
  isBusinessAuthorized: boolean | null;
  loading: boolean;
  error: string | null;
}

interface ChangePasswordData {
  userId: number;
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export const createBusiness = createAsyncThunk(
  'business/createBusiness',
  async (businessData, { rejectWithValue }) => {console.log(businessData);
  
    try {
      const response = await api.post('/businesses', businessData);
      console.log(response.data);
      return response.data; // Assuming response.data contains the created business data
      
    } catch (error) {
      return rejectWithValue('Error creating business');
    }
  }
);

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

export const updateUser = createAsyncThunk(
  'user/updateUser',
  async ({ userId, updates }: UpdateUserData, { rejectWithValue }) => {
    try {
      const response = await api.put(`/users/${userId}`, updates);
      return response.data;
    } catch (error) {
      return rejectWithValue('Error updating user');
    }
  }
);

export const changeUserPassword = createAsyncThunk(
  'user/changePassword',
  async ({ userId, currentPassword, newPassword, confirmPassword }: ChangePasswordData, { rejectWithValue }) => {
    try {
      if (newPassword !== confirmPassword) {
        throw new Error("Passwords do not match");
      }
      const passwordData = {
        currentPassword,
        newPassword,
        confirmPassword
      };
      const response = await api.put(`/users/${userId}/changePassword`, passwordData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Error changing password');
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
    })
    .addCase(updateUser.pending, (state) => {
      state.loading = true;
    })
    .addCase(updateUser.fulfilled, (state, action) => {
      state.userData = {...state.userData, ...action.payload};
      state.loading = false;
    })
    .addCase(updateUser.rejected, (state, action) => {
      state.error = action.error.message;
      state.loading = false;
    })
    .addCase(changeUserPassword.pending, (state) => {
      state.loading = true;
    })
    .addCase(changeUserPassword.fulfilled, (state) => {
      state.loading = false;
    })
    .addCase(changeUserPassword.rejected, (state, action) => {
      state.error = action.error.message;
      state.loading = false;
    })
    .addCase(createBusiness.pending, (state) => {
      state.loading = true;
    })
    .addCase(createBusiness.fulfilled, (state, action) => {
      // handle business creation success
      state.loading = false;
    })
    .addCase(createBusiness.rejected, (state, action) => {
      state.error = action.error.message;
      state.loading = false;
    }); 
  },
});

export const { /* export any reducers */ } = userSlice.actions;
export default userSlice.reducer;
