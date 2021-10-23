//import {login as logIn, logout as logOut} from "./../repository/AuthRepository";
import {
  login as logIn,
  logout as logOut,
  subscribe as makeSubscribe,
} from "./../repository/FakeAuthRepository";

export const login = () => {
  return logIn();
};

export const logout = () => {
  return logOut();
};

export const subscribe = (
  onUserStatusChanged: (user: any) => void,
  onError: (err: any) => void
) => makeSubscribe(onUserStatusChanged, onError);
