//import firebase from "firebase/app";
import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

export const getToken = () => getAuth().currentUser.getIdToken();

export const loginWithPopup = () => {
  const provider = new GoogleAuthProvider();

  const auth = getAuth();

  return signInWithPopup(auth, provider);
};

export const logout = () => {
  const auth = getAuth();

  return signOut(auth);
};

export const subscribe = (
  onUserStatusChanged: (user: any) => void,
  onError: (err: any) => void
) => {
  const auth = getAuth();

  return onAuthStateChanged(auth, onUserStatusChanged, onError);
};
