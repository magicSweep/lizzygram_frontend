import { MutableRefObject, useEffect, useRef, useState } from "react";
import { getToken } from "../../service/AuthService/AuthService.fake";
import { useAuth } from "../useAuth";

const tokenLifetime = 30 * 60 * 1000;

const tokenStuff_ = (setToken: any) => async () => {
  const token = await getToken();

  setToken(token);
};

// TODO: Add as provider
// Look at backend token lifetime
export const useToken = () => {
  const intervalRef: MutableRefObject<undefined | NodeJS.Timer> = useRef();

  const [token, setToken] = useState("");

  const { isAuth } = useAuth();

  const tokenStuff = tokenStuff_(setToken);

  useEffect(() => {
    return () => {
      clearInterval(intervalRef.current);
    };
  }, []);

  useEffect(() => {
    if (isAuth === true) {
      intervalRef.current = setInterval(tokenStuff, tokenLifetime);

      tokenStuff();
    } else {
      clearInterval(intervalRef.current);
    }
  }, [isAuth]);

  return token;
};
