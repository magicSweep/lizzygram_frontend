import wait from "waait";

export {
  loginWithPopup as login,
  logout,
  subscribe,
} from "./../../../service/firebaseAuth/index.fake";

export const getToken = async () => {
  await wait(100);

  return "super-puper-token";
};
