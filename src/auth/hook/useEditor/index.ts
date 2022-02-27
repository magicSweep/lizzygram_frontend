import { useCallback, useEffect } from "react";
import { batch as batch_, useDispatch } from "react-redux";
import { useAuth } from "../useAuth";
import { AuthUser, AuthAction } from "../../types";
import {
  Done,
  map,
  Next,
  then,
  _catch,
  tap,
  compose,
  _finally,
  elif,
  cond,
} from "fmagic";
import {
  getUser as getSavedUser,
  saveUser,
  removeUser as removeSavedUser,
  setIsEditor,
} from "../../service/UserService";
import { authAC, authEditorErrorAC } from "../../store/action";
import { isEditor } from "../../service/DbService";
import { showAlertAC } from "../../../alert";

export let isRequested = false;
export let numberOfRequests = 0;
export let maxNumberOfRequests = 10;

export const setIsRequested = (val: boolean) => (isRequested = val);
export const getIsRequested = () => isRequested;

export const isGoodPrevUser = (prevUser: AuthUser | null, user: AuthUser) =>
  Boolean(
    prevUser !== null &&
      prevUser.isEditor !== undefined &&
      prevUser.uid === user.uid
  );

export const request_ =
  (
    batch: typeof batch_,
    isGoodPrevUser: (prevUser: AuthUser | null, user: AuthUser) => boolean,
    setIsRequested: (val: boolean) => void,
    getIsRequested: () => boolean,
    isEditor: (user: AuthUser) => Promise<AuthUser>,
    getSavedUser: () => AuthUser | null,
    saveUser: (user: AuthUser) => void
  ) =>
  (dispatch: any) =>
    elif(
      () => getIsRequested() === true,
      () => {},
      compose<AuthUser | null, void>(
        (user: AuthUser | null) =>
          user !== null && user.isEditor === undefined
            ? Next.of(user)
            : Done.of(null),
        map((user: AuthUser) => ({
          user,
          savedUser: getSavedUser(),
        })),
        map(
          cond([
            [
              ({ user, savedUser }: any) => isGoodPrevUser(savedUser, user),
              ({ user, savedUser }: any) =>
                dispatch(
                  authAC({
                    ...(user as AuthUser),
                    isEditor: (savedUser as AuthUser).isEditor,
                  })
                ),
            ],
            [
              () => true,
              compose(
                tap(() => setIsRequested(true)),
                ({ user }: any) => isEditor(user as AuthUser),
                then((newUser: AuthUser) => {
                  saveUser(newUser);
                  dispatch(authAC(newUser));
                }),
                _catch((err) => {
                  console.error(err);
                  batch(() => {
                    dispatch(
                      showAlertAC(
                        "Произошла ошибка при идентификации вашего аккаунта, некоторый функции могут быть недоступны.",
                        "error"
                      )
                    );
                    dispatch(authEditorErrorAC());
                  });
                }),
                _finally(() => setIsRequested(false))
              ),
            ],
          ])
        )
      )
    );

export const request = request_(
  batch_,
  isGoodPrevUser,
  setIsRequested,
  getIsRequested,
  isEditor,
  getSavedUser,
  saveUser
);

/* export const request = (dispatch: any, user: AuthUser | undefined) =>
  flow(
    () => (user && user.isEditor === undefined ? Next.of(null) : Done.of(null)),
    chain(() => (isRequested === false ? Next.of(null) : Done.of(null))),
    // chain(() =>
    //  user && user.isEditor === undefined ? Next.of(null) : Done.of(null)
    //), 
    map(getSavedUser),
    //map(tap((prevUser) => console.log("--------PREV USER", prevUser))),
    map(
      // (prevUser: IAuthUser | undefined) => 
      cond([
        [
          (prevUser: IAuthUser | undefined) =>
            isGoodPrevUser(prevUser, user as IAuthUser),
          (prevUser: IAuthUser | undefined) =>
            dispatch(
              authAC({
                ...(user as IAuthUser),
                isEditor: (prevUser as IAuthUser).isEditor,
              })
            ),
        ],
        [
          () => true,
          flow(
            () => (isRequested = true),
            () => isEditor(user as IAuthUser),
            then((newUser: IAuthUser) => {
              saveUser(newUser);
              dispatch(authAC(newUser));
            }),
            _catch((err) => console.error(err)),
            _finally(() => (isRequested = false))
          ),
        ],
      ])
    )
  ); */

export const useEditor = () => {
  const dispatch = useDispatch();

  const { user, loading, userUid, isAuth } = useAuth();

  const start = useCallback(request(dispatch), []);

  useEffect(() => {
    /* if (
      //numberOfRequests < maxNumberOfRequests &&
      isRequested === false &&
      user &&
      user.isEditor === undefined
    ) { */
    start(user);
    //++numberOfRequests;
    // }
  }, [user]);

  const onChangeEditorStatus = (isEditor: boolean) => {
    // set isEditor to false on local storage
    setIsEditor(isEditor);
    // set isEditor to false on state
    dispatch(
      authAC({
        ...(user as AuthUser),
        isEditor,
      })
    );
  };

  /* const reload = () => {
    removeSavedUser();
    start({ ...user, isEditor: undefined });
  }; */

  return {
    user,
    loading,
    userUid,
    isAuth,
    //reload,
    onChangeEditorStatus,
  };
};
