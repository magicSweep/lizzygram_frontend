import wait from "waait";
import { UserResponseToClient, AuthUser } from "./../../types";

export const getUser = (): AuthUser | null => {
  /* return {
    name: "miracleMan",
    uid: "123uid",
    email: "hello@mail.ru",
    isEditor: true,
  }; */
  return null;
};

export const saveUser = (user: UserResponseToClient) => {
  //set user to localStorage
  return;
};

export const removeUser = () => {
  //set user to localStorage
  //window.localStorage.removeItem(key);
  return;
};

export const isEditor = async (userUid: string) => {
  await wait(2000);

  return true;
};

export const setIsEditor = (isEditor: boolean) => {};

export const grantPermissions = async (userUid: string) => {
  await wait(2000);

  return;
};

export const revokePermissions = async (userUid: string) => {
  await wait(2000);

  return;
};
