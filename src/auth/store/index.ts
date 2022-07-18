import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthState, AuthUser } from "./../types";

//export const localStorageKey = "lg_super_puper_user";

//const initUser = typeof window === "undefined" ? null : getUser();
//const initLoading = initUser === null;

const initialState: AuthState = {
  user: undefined,
  loading: true,
  //loginLoading: false,
  //logoutLoading: false,
  //forgetPassLoading: false,
  loginError: false,
  logoutError: false,
  //forgetPassError: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    auth(state, action: PayloadAction<AuthUser | undefined>) {
      state.user = action.payload;
      state.loading = false;
    },
    authEditorError(state) {
      state.loading = false;
    },
    loginRequest(state) {
      state.loading = true;
      state.loginError = false;
    },
    loginRequestError(state) {
      state.loading = false;
      state.loginError = true;
    },
    logoutRequest(state) {
      state.loading = true;
      state.logoutError = false;
    },
    logoutRequestError(state) {
      state.loading = false;
      state.logoutError = true;
    },
    grantPermissionsRequestStart(state) {
      state.loading = true;
    },
    revokePermissionsRequestStart(state) {
      state.loading = true;
    },
    permissionsRequestEnd(state) {
      state.loading = false;
    },
  },
});

export const {
  auth: authAC,
  authEditorError: authEditorErrorAC,
  loginRequest: loginRequestAC,
  loginRequestError: loginRequestErrorAC,
  logoutRequest: logoutRequestAC,
  logoutRequestError: logoutRequestErrorAC,
  grantPermissionsRequestStart: grantPermissionsRequestStartAC,
  revokePermissionsRequestStart: revokePermissionsRequestStartAC,
  permissionsRequestEnd: permissionsRequestEndAC,
} = authSlice.actions;

export default authSlice.reducer;
