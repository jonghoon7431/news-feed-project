// src/redux/slices/authSlice.js

import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isSignedIn: false,
  },
  reducers: {
    setSignIn: (state, action) => {
      state.isSignedIn = action.payload;
    },
  },
});

export const { setSignIn } = authSlice.actions;

export const selectSignIn = (state) => state.auth.isSignedIn;

export default authSlice.reducer;
