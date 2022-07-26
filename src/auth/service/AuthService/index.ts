export {
  loginWithPopup as login,
  logout,
  subscribe,
  getToken,
} from "./../../../service/firebase/firebase.auth";

//export { getToken } from "./../../../service/firebase/firebase.auth";

/* export const login = loginWithPopup;

export const logout = () => {
  return logOut();
};

export const subscribe = (
  onUserStatusChanged: (user: any) => void,
  onError: (err: any) => void
) => makeSubscribe(onUserStatusChanged, onError); */
