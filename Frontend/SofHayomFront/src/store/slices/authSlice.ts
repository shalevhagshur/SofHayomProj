import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../utils/api';
import { Base64 } from 'js-base64';

    const decodeToken = (token: string) => {
        try {
          const base64Url = token.split('.')[1];
          const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
          const jsonPayload = decodeURIComponent(Base64.atob(base64).split('').map((c) => {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
          }).join(''));
      
          return JSON.parse(jsonPayload);
        } catch (e) {
          console.error('Error decoding token:', e);
          return null;
        }
      };

    interface AuthState {
    isAuthenticated: boolean;
    userRole: number | null;
    token: string | null;
    isBusinessAuthorized: boolean | null | number;
    loading: boolean;
    error: string | null;
    }

    const initialState: AuthState = {
    isAuthenticated: false,
    userRole: null,
    token: null,
    loading: false,
    error: null,
    isBusinessAuthorized: false,
    };


 // Async thunk for signing in
 export const signIn = createAsyncThunk(
  'auth/signIn',
  async (userData: { email: string; password: string }, { rejectWithValue }) => {
      try {
          const response = await api.post('/login', userData);
          if (response.data && response.data.access_token) {
              const decoded = decodeToken(response.data.access_token);
              const userId = decoded.sub;
              const userResponse = await api.get(`/users/${userId}`);

              // Extract isBusinessAuthorized
              const isBusinessAuthorized = userResponse.data.is_business_authorized === 1;
              console.log('IsBusinessAuthorized:', isBusinessAuthorized); // Add this line
              console.log('Response from server:', response.data);
             

              return { 
                  token: response.data.access_token, 
                  userRole: userResponse.data.role_id,
                  isBusinessAuthorized: isBusinessAuthorized // Include this in the payload
              };
          } else {
              console.log('Token missing in response');
              return rejectWithValue('Token missing in response');
          }
      } catch (error) {
          console.error('SignIn Error:', error);
          if (error.response) {
              return rejectWithValue(error.response.data);
          }
          return rejectWithValue('An unknown error occurred');
      }
  }
);
  
  export const registerUser = createAsyncThunk(
    'auth/registerUser',
    async (userData: { username: string; email: string; password: string; password_confirmation: string }, { rejectWithValue }) => {
      try {
        const response = await api.post('/register', userData);
        if (!response.data.token) {
          throw new Error("Token missing in API response");
        }
        const decoded = decodeToken(response.data.token);
        if (!decoded || !decoded.sub) {
          throw new Error("Invalid token structure");
        }
        const userId = decoded.sub;
        const userResponse = await api.get(`/users/${userId}`);
        return { token: response.data.token, userRole: userResponse.data.role_id };
      } catch (error) {
        return rejectWithValue(error.message || 'An unknown error occurred');
      }
    }
  );
  
  export const registerBusiness = createAsyncThunk(
    'auth/registerBusiness',
    async (userData: { username: string; email: string; password: string; password_confirmation: string }, { rejectWithValue }) => {
      try {
        const response = await api.post('/registerBusiness', userData);
        const decoded = decodeToken(response.data.token);
        const userId = decoded.sub;
        const userResponse = await api.get(`/users/${userId}`);
        return { token: response.data.token, userRole: userResponse.data.role_id };
      } catch (error) {
        if (error.response) return rejectWithValue(error.response.data);
        return rejectWithValue('An unknown error occurred');
      }
    }
  );

    export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
      setCredentials: (state, action: PayloadAction<{ token: string; userRole: number, isBusinessAuthorized: boolean | null }>) => {
        console.log('Setting credentials:', action.payload);
        state.isAuthenticated = true;
        state.token = action.payload.token;
        state.userRole = action.payload.userRole;
        state.isBusinessAuthorized = action.payload.isBusinessAuthorized; // Set this state
      },
        logout: (state) => {
          state.isAuthenticated = false;
          state.token = null;
          state.userRole = null;
          state.loading = false;
          state.error = null;
          state.isBusinessAuthorized = null;
      },
        // Add other reducers as needed
    },
    extraReducers: (builder) => {
        builder
        .addCase(signIn.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(signIn.fulfilled, (state, action) => {
            state.isAuthenticated = true;
            state.token = action.payload.token;
            state.userRole = action.payload.userRole;
            state.isBusinessAuthorized = action.payload.isBusinessAuthorized
            state.loading = false;
        })
        .addCase(signIn.rejected, (state, action) => {
            state.error = action.payload as string;
            state.loading = false;
        });
        builder
        .addCase(registerUser.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(registerUser.fulfilled, (state, action) => {
          state.isAuthenticated = true;
          state.token = action.payload.token;
          state.userRole = action.payload.userRole;
          state.loading = false;
        })
        .addCase(registerUser.rejected, (state, action) => {
          state.error = action.payload as string;
          state.loading = false;
        })
        .addCase(registerBusiness.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(registerBusiness.fulfilled, (state, action) => {
          state.isAuthenticated = true;
          state.token = action.payload.token;
          state.userRole = action.payload.userRole;
          state.loading = false;
        })
        .addCase(registerBusiness.rejected, (state, action) => {
          state.error = action.payload as string;
          state.loading = false;
        });
    },
    });

    export const { setCredentials, logout } = authSlice.actions;

    export default authSlice.reducer;
