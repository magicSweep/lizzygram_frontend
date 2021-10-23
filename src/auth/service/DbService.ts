//import { isUserExists } from "../repository/FirestoreRepository";
import { isUserExists } from "../repository/FakeFirestoreRepository";
import { AuthUser } from "./../types";

export const isEditor = async (user: AuthUser): Promise<AuthUser> => {
  const is_editor = await isUserExists(user.uid);

  const newUser = {
    ...user,
    isEditor: is_editor,
  };

  return newUser;
};
