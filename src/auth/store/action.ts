//import firebase from "firebase/app";
//import "firebase/auth";
//import { IAuthAction } from "./../types";
import { AuthUser, AuthAction } from "./../types";
//import { ILoginFormData } from "../types";
//import { authLocalStorageKey } from "./../../config";

export const authAC = (user?: AuthUser): AuthAction => {
  return {
    type: "AUTH",
    user,
  };
};

export const loginRequestAC = (): AuthAction => {
  return {
    type: "LOGIN_REQUEST",
  };
};

/* export const loginRequestSuccessAC = (): IAuthAction => {
  return {
    type: "LOGIN_REQUEST_SUCCESS",
  };
}; */

export const loginRequestErrorAC = (): AuthAction => {
  return {
    type: "LOGIN_REQUEST_ERROR",
  };
};

export const logoutRequestAC = (): AuthAction => {
  return {
    type: "LOGOUT_REQUEST",
  };
};

/* export const logoutRequestSuccessAC = (): IAuthAction => {
  return {
    type: "LOGOUT_REQUEST_SUCCESS",
  };
}; */

export const logoutRequestErrorAC = (): AuthAction => {
  return {
    type: "LOGOUT_REQUEST_ERROR",
  };
};
