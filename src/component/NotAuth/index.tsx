import React, { FC } from "react";
import { useAuth } from "../../auth/hook/useAuth";
import NotAuthWidget from "./NotAuth";
import { navigate } from "gatsby";

const NotAuth: FC = () => {
  const { isAuth, loading } = useAuth();

  /* if (user !== null) {
    navigate("/wall-of-photos");

    return null;
  } */

  //const isAuth = !!(user && user.uid);

  if (isAuth === true) return null;

  return <NotAuthWidget loading={loading} />;
};

export default NotAuth;
