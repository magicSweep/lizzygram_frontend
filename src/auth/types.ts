import { Action, Reducer } from "redux";
//import { IUserResponseToClient, IAuthUser } from "./../types";

export interface UserResponseToClient {
  name: string;
  email: string;
  uid: string;
}

export interface AuthUser extends UserResponseToClient {
  isEditor: undefined | boolean;
}

/* export type IFirestoreData = Map<string, any>; */

// STORE
export type AuthActionTypes =
  | "AUTH"
  | "AUTH_EDITOR_ERROR"
  | "LOGIN_REQUEST"
  | "LOGIN_REQUEST_SUCCESS"
  | "LOGIN_REQUEST_ERROR"
  | "LOGOUT_REQUEST"
  | "LOGOUT_REQUEST_SUCCESS"
  | "LOGOUT_REQUEST_ERROR"
  | "GRANT_PERMISSIONS_REQUEST_START"
  //| "GET_PERMISSIONS_REQUEST_END"
  | "REVOKE_PERMISSIONS_REQUEST_START"
  | "PERMISSIONS_REQUEST_END";

/*   | "FORGET_PASS_REQUEST"
  | "FORGET_PASS_SUCCESS"
  | "FORGET_PASS_ERROR" */

export interface AuthState {
  user: AuthUser | undefined;
  loading: boolean;
  //logoutLoading: boolean;
  //forgetPassLoading: boolean;
  loginError: boolean;
  logoutError: boolean;
  //forgetPassError: boolean;
}

export interface AuthAction extends Action<AuthActionTypes> {
  type: AuthActionTypes;
  user?: AuthUser;
  //isEditor?: boolean;
}

// FORM
export interface LoginFormData {
  email: string;
  password: string;
}

export interface ForgetPassFormData {
  email: string;
}
