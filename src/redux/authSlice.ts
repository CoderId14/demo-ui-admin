import { DataLogin, RefreshTokenResponse, UserLoginSliceState, UserLogoutSliceState } from "@/types/auth.type";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const loginInitialState: UserLoginSliceState = {
    user: undefined,
    isFetching: false,
    error: false,
    message: "",
  };
export const logoutInitialState: UserLogoutSliceState = {
    isFetching: false,
    error: false,
    success: false,
  };
const authSlice = createSlice({
    name: "auth",
    initialState: {
      login: loginInitialState,
      logout: logoutInitialState,
    },
    reducers: {
      loginStart: (state: any) => {
        state.login.isFetching = true;
      },
      loginSuccess: (state: any, action: PayloadAction<DataLogin>) => {
        state.login.isFetching = false;
        state.login.user = {
          username: action.payload.sub,
          accessToken: action.payload.accessToken,
          refreshToken: action.payload.refreshToken,
          roles: action.payload.roles,
        };
        state.login.error = false;
        state.login.message = "Login successfully";
      },
      loginFailed: (state: any, action: PayloadAction<string>) => {
        state.login.isFetching = false;
        state.login.error = true;
        state.login.message = action.payload;
        state.login.user = {
          username: null,
          accessToken: null,
          refreshToken: null,
          roles: null,
        };
      },
      logoutSuccess: (state: any, action: PayloadAction<string>) => {
        state.logout.isFetching = false;
        state.logout.error = false;
        state.logout.message = action.payload;
        state.login.user = undefined;
      },
      logoutFailed: (state: any, action: PayloadAction<string>) => {
        state.logout.isFetching = false;
        state.logout.error = true;
        state.logout.message = action.payload;
      },
      logoutStart: (state: any) => {
        state.logout.isFetching = true;
      },
      updateAccessToken: (state: any, action: PayloadAction<RefreshTokenResponse>) =>{
        state.login.user = {
          accessToken: action.payload.accessToken,
          refreshToken: action.payload.refreshToken,
        };
      }
    }
})

export const {
    loginStart,
    loginFailed,
    loginSuccess,
    logoutFailed,
    logoutSuccess,
    logoutStart,
    updateAccessToken
  } = authSlice.actions;
  
  export default authSlice.reducer;
  