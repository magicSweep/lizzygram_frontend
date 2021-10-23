import { UserResponseToClient } from "./../types";

export const getObjByKey = (key: string): UserResponseToClient | undefined => {
  return {
    name: "miracleMan",
    uid: "123uid",
    email: "hello@mail.ru",
  };
};

export const addObj = (user: UserResponseToClient, key: string) => {
  //set user to localStorage
  return;
};

export const remove = (key: string) => {
  //set user to localStorage
  //window.localStorage.removeItem(key);
  return;
};
