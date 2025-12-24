import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { IUser } from "../../../interfaces/user";

interface AuthState {
  userInfo: IUser | null,
  accessToken: string | null,
}

const initialState: AuthState = {
  userInfo: null,
  accessToken: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<{ user: IUser, accessToken: string }>) => {
      state.userInfo = action.payload.user;
      state.accessToken = action.payload.accessToken;
    },
    updateUserInfo: (state, action: PayloadAction<{ user: IUser }>) => {
      state.userInfo = action.payload.user;
    },
    logout: (state) => {
      state.userInfo = null;
      state.accessToken = null;
    },
  },
});

export const { setCredentials, updateUserInfo, logout } = authSlice.actions;
export default authSlice.reducer;
