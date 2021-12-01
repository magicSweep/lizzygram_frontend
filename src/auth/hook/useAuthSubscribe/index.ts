import { useEffect } from "react";
//import { IAuthUser } from "../../types";
import { useDispatch } from "react-redux";
import { authAC } from "../../store/action";
import { AuthUser } from "../../types";
import { Done, map, Next, flat, tap, compose } from "fmagic";
//import { IGlobalState } from "../../store/types";
//import firebase from "firebase/app";
import { Unsubscribe } from "firebase/auth";
//import { initApp } from "./../../../service/firebase";
import { initApp } from "./../../../service/firebase/fake";
import { subscribe } from "../../repository/FakeAuthRepository";

initApp();

let unsubscribe: Unsubscribe;

export const onAuthStateChanged = (dispatch: any) =>
  compose(
    //tap((user) => console.log("-========= ON AUTH STATE CHANGED", user)),
    (user: any | null) => (user ? Next.of(user) : Done.of(null)),
    map((user: any) => ({
      name: user.displayName ? user.displayName : "",
      email: user.email ? user.email : "",
      uid: user.uid,
      isEditor: undefined,
    })),
    flat((user: AuthUser | null) => dispatch(authAC(user)))
  );

export const makeSubscribe = (dispatch: any) =>
  subscribe(onAuthStateChanged(dispatch), (err) => {
    dispatch(authAC(null));
    console.error("AUTH SUBSCRIBE ERROR", err);
  });
/* firebase.auth().onAuthStateChanged(onAuthStateChanged(dispatch), (err) => {
    dispatch(authAC(undefined));
    console.error("AUTH SUBSCRIBE ERROR", err);
  }); */

export const useAuthSubscribe = () =>
  //auth: (user: IAuthUser) => void,
  //onError?: Function,
  //onSuccess?: Function
  {
    const dispatch = useDispatch();

    useEffect(() => {
      //console.log("USE AUTH SUBSCRIBE");

      if (unsubscribe === undefined) {
        unsubscribe = makeSubscribe(dispatch);

        //console.log("MAKE AUTH SUBSCRIBE", unsubscribe);
      }

      return () => {
        //console.log("MAKE AUTH UNSUBSCRIBE");
        unsubscribe();
      };
    }, []);
  };
