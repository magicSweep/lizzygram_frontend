import { addObj, remove, getObjByKey } from "./../repository/localStorage";
import { authLocalStorageKey } from "./../../config";
import { AuthUser } from "./../types";

export const getUser = (): AuthUser | null => {
  return getObjByKey<AuthUser>(authLocalStorageKey);
};

export const saveUser = (user: AuthUser) => {
  //set user to localStorage
  addObj(
    { name: user.name, email: user.email, isEditor: user.isEditor },
    authLocalStorageKey
  );
};

export const removeUser = () => {
  //set user to localStorage
  remove(authLocalStorageKey);
};

export const setIsEditor = (isEditor: boolean) => {
  const user: any = getObjByKey(authLocalStorageKey);

  addObj({ name: user.name, email: user.email, isEditor }, authLocalStorageKey);
};
