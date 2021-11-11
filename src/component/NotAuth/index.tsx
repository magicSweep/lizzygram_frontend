import React, { FC } from "react";
import { useAuth } from "../../auth/hook/useAuth";
import NotAuthWidget from "./NotAuth";
import { navigate } from "gatsby";

const NotAuth: FC = () => {
  const { user, loading } = useAuth();

  if (user !== null) {
    navigate("/wall-of-photos");

    return null;
  }

  return <NotAuthWidget loading={loading} />;
};

export default NotAuth;
