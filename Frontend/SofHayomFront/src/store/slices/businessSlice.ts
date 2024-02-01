// Importing necessary utilities from Redux Toolkit
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import api from '../../utils/api'; // Ensure the path to your API utility is correct

// Define a type for the slice state
interface BusinessState {
    businessData: Business | null; 
    loading: boolean;
    error: string | null;
  }
  
  // Define a type for the business data 
  interface Business {
    id: number;
    name: string;
    address: string;
    user_id: number;
    business_image: string | null;
    // Add other business properties as needed
  }

// Initial state for the business slice
const initialState: BusinessState = {
  businessData: null,
  loading: false,
  error: null,
};

export const fetchBusinessByUserId = createAsyncThunk<Business, number, { rejectValue: string }>(
    'business/fetchByUserId',
    async (userId, { rejectWithValue }) => {
      try {
        const response = await api.get(`/businesses/user/${userId}`);
        return response.data; // Assuming the API returns the business data directly
      } catch (error) {
        return rejectWithValue('Failed to fetch business data');
      }
    }
  );

// Async thunk for fetching business information
export const fetchBusiness = createAsyncThunk(
  'business/fetchBusiness',
  async (businessId: number, { rejectWithValue }) => {
    try {
      const response = await api.get(`/businesses/${businessId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.toString());
    }
  }
);

// Async thunk for creating or updating business information
export const saveBusiness = createAsyncThunk(
    'business/saveBusiness',
    async (businessData: Business, { rejectWithValue }) => {
      try {
        const { id, name, address, user_id, business_image } = businessData;
  
        let response;
        if (id) {
          // Update existing business
          response = await api.put(`/businesses/${id}`, { name, address, user_id, business_image });
        } else {
          // Create new business
          response = await api.post('/businesses', { name, address, user_id, business_image });
        }
  
        return response.data;
      } catch (error) {
        return rejectWithValue(error.toString());
      }
    }
  );

// The business slice
const businessSlice = createSlice({
  name: 'business',
  initialState,
  reducers: {
    // Reducers for synchronous actions can be defined here
    setBusinessData: (state, action: PayloadAction<Business>) => {
        state.businessData = action.payload;
      },
      
    clearBusinessData: (state) => {
        state.businessData = null;
      }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBusiness.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchBusiness.fulfilled, (state, action) => {
        state.businessData = action.payload;
        state.loading = false;
      })
      .addCase(fetchBusiness.rejected, (state, action) => {
        state.error = action.payload as string;
        state.loading = false;
      })
      .addCase(saveBusiness.pending, (state) => {
        state.loading = true;
      })
      .addCase(saveBusiness.fulfilled, (state, action) => {
        state.businessData = action.payload;
        state.loading = false;
      })
      .addCase(saveBusiness.rejected, (state, action) => {
        state.error = action.payload as string;
        state.loading = false;
      })
      .addCase(fetchBusinessByUserId.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchBusinessByUserId.fulfilled, (state, action) => {
        state.businessData = action.payload;
        state.loading = false;
      })
      .addCase(fetchBusinessByUserId.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      });
  },
});

// Export the reducer and any synchronous actions
export const { setBusinessData, clearBusinessData } = businessSlice.actions;
export default businessSlice.reducer;
