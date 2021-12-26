import {
  login as logIn,
  logout as logOut,
  subscribe as makeSubscribe,
} from "./../../firebase/firebase.auth";
/* import {
  login as logIn,
  logout as logOut,
  subscribe as makeSubscribe,
} from "./../../firebase/firebase.auth.fake"; */

export const login = async () => {
  //console.log("------------LOGIN REQUEST");
  const user = await logIn();
  //console.log("------------LOGIN SUCCESS", user);
  return true;
};

export const logout = () => {
  return logOut();
};

export const subscribe = (
  onUserStatusChanged: (user: any) => void,
  onError: (err: any) => void
) => makeSubscribe(onUserStatusChanged, onError);
