//import { UserResponseToClient } from "./../types";

export const getObjByKey = <T extends Object>(key: string): T | null => {
  const savedData: string | null = window.localStorage.getItem(key);

  const userData: T | null = savedData !== null ? JSON.parse(savedData) : null;

  return userData;
};

export const addObj = <T extends Object>(item: T, key: string) => {
  //set user to localStorage
  window.localStorage.setItem(key, JSON.stringify(item));
};

export const remove = (key: string) => {
  //set user to localStorage
  window.localStorage.removeItem(key);
};
