import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { UserProfile } from './types';

type UserState = {
  currentUser: UserProfile | null;
};

const initialState: UserState = {
  currentUser: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    clearUser(state) {
      state.currentUser = null;
    },
    setUser(state, action: PayloadAction<UserProfile>) {
      state.currentUser = action.payload;
    },
    updateUser(state, action: PayloadAction<Partial<UserProfile>>) {
      if (state.currentUser) {
        state.currentUser = { ...state.currentUser, ...action.payload };
      }
    },
  },
});

export const { clearUser, setUser, updateUser } = userSlice.actions;
export const userReducer = userSlice.reducer;
