import wait from "waait";

export {
  loginWithPopup as login,
  logout,
  subscribe,
} from "./../../../i-service/firebase/firebase.auth.fake";

export const getToken = async (userUid: string) => {
  await wait(100);

  return "super-puper-token";
};
