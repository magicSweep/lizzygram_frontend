import { addObj, remove, getObjByKey } from "./../../../i-service/localStorage";
import { authLocalStorageKey } from "./../../../config";
import { AuthUser } from "./../../types";
import {
  isExists,
  addOne,
  removeOne,
} from "../../../i-service/firebase/firestore";
import { usersCollectionName } from "../../../config";

export const isEditor: (userUid: string) => Promise<boolean> =
  isExists(usersCollectionName);

/* export const isEditor = async (user: AuthUser): Promise<AuthUser> => {
  const is_editor = await isUserExists(user.uid);

  const newUser = {
    ...user,
    isEditor: is_editor,
  };

  return newUser;
}; */

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

export const grantPermissions = (userUid: string) =>
  addOne(usersCollectionName)({
    id: userUid,
  });

export const revokePermissions = (userUid: string) =>
  removeOne(usersCollectionName)(userUid);
