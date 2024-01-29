import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  isLoggedIn: boolean;
  // other user states
}

const initialState: UserState = {
  isLoggedIn: false,
  // other initial states
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state) => {
      state.isLoggedIn = true;
    },
    // other reducers
  },
});

export const { login } = userSlice.actions;

export default userSlice.reducer;
