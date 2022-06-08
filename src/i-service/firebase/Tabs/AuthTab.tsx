import React, { useEffect, useState, FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFirestore } from "firebase/firestore";
import { init as initializeFirebase } from "./../init";
import {
  useAuth,
  useEditor,
  useLogin,
  useLogout,
  useAuthSubscribe,
} from "../../auth";
import { getUser as getUserFromLocalStorage } from "../../auth/service/UserService";
import { AuthUser } from "../../auth/types";
import Box from "@mui/system/Box";
import { Button } from "@mui/material";

const getUserInfo = (user: AuthUser) => {
  if (user === undefined)
    return {
      name: "undefined",
      uid: "undefined",
      email: "undefined",
      isEditor: "undefined",
    };

  if (user === null)
    return {
      name: "null",
      uid: "null",
      email: "null",
      isEditor: "null",
    };

  return {
    name: user.name,
    uid: user.uid === undefined ? "undefined" : user.uid,
    email: user.email,
    isEditor:
      user.isEditor === undefined ? "undefined" : user.isEditor.toString(),
  };
};

const AuthTab = () => {
  // -------- AUTH SUBSCRIBE
  // we make subscribe on auth user change
  // set user implements only on subscribe
  useAuthSubscribe();

  // -------- AUTH STATE
  // we get info about what's going on subscribe
  const { user, loading } = useEditor();

  const { login } = useLogin();

  const { logout } = useLogout();

  // -------- AUTH LOCAL STORAGE
  const [localStorageUser, setLocalStorageUser] = useState<AuthUser | null>(
    null
  );

  useEffect(() => {
    setLocalStorageUser(getUserFromLocalStorage());
  }, [user]);

  const userInfo = getUserInfo(user);

  const userLocalStorageInfo = getUserInfo(localStorageUser);

  return (
    <Box width="600px" className="m-auto pt-2">
      <Box className="p-2">
        <Button size="small" onClick={login}>
          login
        </Button>
        <span> | </span>
        <Button size="small" onClick={logout}>
          logout
        </Button>
      </Box>
      <Box className="p-4">
        <Box typography="body1">User state:</Box>

        <Box typography="body2">
          <p> - loading - {loading.toString()}</p>
          <p> - name - {userInfo.name}</p>
          <p> - uid - {userInfo.uid}</p>
          <p> - email - {userInfo.email}</p>
          <p> - isEditor - {userInfo.isEditor}</p>
        </Box>
      </Box>

      <Box className="p-4">
        <Box typography="body1">Local storage: </Box>

        <Box typography="body2">
          <p> - name - {userLocalStorageInfo.name}</p>
          <p> - uid - {userLocalStorageInfo.uid}</p>
          <p> - email - {userLocalStorageInfo.email}</p>
          <p> - isEditor - {userLocalStorageInfo.isEditor}</p>
        </Box>
      </Box>

      <Box>
        <Box typography="body1" component="h4" textAlign="center">
          Auth mechanism description.
        </Box>
        <Box typography="body2" component="h5" className="p-1">
          Subscribe:
        </Box>
        <Box typography="body2" component="p" className="p-1">
          - Auth subscribe - place where we set user info to our state.
        </Box>
        <Box typography="body2" component="h5" className="p-1">
          Login:
        </Box>
        <Box typography="body2" component="p" className="p-1">
          - We send login request to firebase. On success firebase triggers user
          change on subscribe
        </Box>
        <Box typography="body2" component="h5" className="p-1">
          Is editor:
        </Box>
        <Box typography="body2" component="p" className="p-1">
          - Have user add/edit photos priveleges? When subscription triggers
          with auth user.
        </Box>
        <Box typography="body2" component="p" className="p-1">
          - First time we send request to know about isEditor, and when we get
          response we save our user info to local storage(name, emali,
          isEditor). Next time we get isEditor from our local storage.
        </Box>
        <Box typography="body2" component="p" className="p-1">
          - On logout we remove local storage info
        </Box>
      </Box>
    </Box>
  );
};

export default AuthTab;
