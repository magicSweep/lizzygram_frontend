/* import React, { useState, useEffect } from "react";
//import Button from "@material-ui/core/Button";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import PhotoTab from "./PhotoTab";
import Button from "@mui/material/Button";
//import Button from "../../component/Button";
import { UserResponseToClient } from "../types";

const provider = new GoogleAuthProvider();
const auth = getAuth();

auth.languageCode = "ru";

export default {
  component: PhotoTab,
  title: "Auth/GoogleAuth",
  decorators: [],
  //decorators: [withKnobs],
  // Our exports that end in "Data" are not stories.
  excludeStories: /.*Data$/,
};

const singinPopUp = async () => {
  try {
    const res = await signInWithPopup(auth, provider);
    //var token = res.credential.;
    // The signed-in user info.
    var user = res.user;
    console.log("SUCCESS", user);
  } catch (error) {
    var errorCode = error.code;
    var errorMessage = error.message;
    // The email of the user's account used.
    var email = error.email;
    // The firebase.auth.AuthCredential type that was used.
    var credential = error.credential;
    console.log("ERROR", errorMessage);
  }
};

const signout = async () => {
  try {
    await signOut(auth);

    console.log("SUCCESS SINGOUT");
  } catch (err) {
    console.log("ERROR", err);
  }
};

export const Default = () => {
  const [user, setUser] = useState<UserResponseToClient | undefined>(undefined);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (user) => {
        if (user) {
          setUser({
            name: user.displayName ? user.displayName : "Хто-то",
            email: user.email ? user.email : "",
            uid: user.uid,
          });

          // ...
        } else {
          // User is signed out.
          // ...
          setUser(undefined);
        }
      },
      (err) => {
        setUser(undefined);
      }
    );

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <>
      <Button onClick={signout}>Sign out.</Button>
      <Button onClick={singinPopUp}>Sign in with Google account(popup).</Button>

      {!user && <p>No user</p>}

      {user && (
        <div>
          <p>Name - {user.name}</p>
          <p>Email - {user.email}</p>
          <p>UID - {user.uid}</p>
        </div>
      )}
    </>
  );
};
 */
