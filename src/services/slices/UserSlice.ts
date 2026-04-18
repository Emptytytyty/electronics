import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";
import type { IUser } from "../../types";
import { deleteCookie, loginApi, logoutApi } from "../../api/api";

type TUserState = {
  user: IUser | null;
  loginRequest: boolean;
  logoutRequest: boolean,
  isAuthChecked: boolean;
  userError: null | string;
  logoutError: null | string;
};

const initialState: TUserState = {
  user: null,
  loginRequest: false,
  logoutRequest: false,
  isAuthChecked: true,
  userError: null,
  logoutError: null,
};

export const loginAction = createAsyncThunk("user/login", loginApi);
export const logout = createAsyncThunk("user/logout", logoutApi);

export const UserSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
  },
  selectors: {
    getUserSelector: (state: TUserState) => state.user,
    getIsAuthChecked: (state: TUserState) => state.isAuthChecked,
    getLoginRequest: (state: TUserState) => state.loginRequest,
    getLoginError: (state: TUserState) => state.userError
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginAction.pending, (state: TUserState) => {
        state.loginRequest = true;
        state.isAuthChecked = false;
        state.userError = null;
      })
      .addCase(loginAction.rejected, (state: TUserState, action) => {
        state.userError = action.error.message as string;
        state.isAuthChecked = true;
        state.loginRequest = false;
      })
      .addCase(
        loginAction.fulfilled,
        (state: TUserState, action: PayloadAction<IUser>) => {
          state.user = action.payload;
          state.loginRequest = false;
          state.isAuthChecked = true;
        }
      )
      .addCase(logout.pending, (state) => {
        state.logoutRequest = true;
        state.logoutError = null;
      })
      .addCase(logout.rejected, (state, action) => {
        state.logoutRequest = false;
        state.user = null;
        state.logoutError = action.error.message as string;
      })
      .addCase(logout.fulfilled, (state) => {
        state.logoutRequest = false;
        state.user = null;
        deleteCookie('token');
      })
  },
});

export const { getUserSelector, getIsAuthChecked, getLoginRequest, getLoginError } =
  UserSlice.selectors;
