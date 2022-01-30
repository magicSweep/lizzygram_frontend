import React, { FC } from "react";
import { useAuth } from "../../auth/hook/useAuth";
import NotAuthWidget from "./NotAuth";
//import { navigate } from "gatsby";
import { getBuildFor } from "lizzygram-common-data";

const NotAuth: FC = () => {
  const { isAuth, loading } = useAuth();

  const buildFor = getBuildFor();

  console.log("BUILD_FOR", process.env.BUILD_FOR);
  console.log("HELLO", process.env.HELLO);

  /* if (user !== null) {
    navigate("/wall-of-photos");

    return null;
  } */

  //const isAuth = !!(user && user.uid);

  if (isAuth === true) return null;

  return <NotAuthWidget loading={loading} buildFor={buildFor} />;
};

export default NotAuth;
