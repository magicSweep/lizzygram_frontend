import wait from "waait";

export {
  loginWithPopup as login,
  logout,
  subscribe,
} from "./../../../service/firebase/firebase.auth.fake";

export const getToken = async () => {
  await wait(100);

  return "super-puper-token";
};
