import React, { FC } from "react";
import { useAuth } from "../../auth/hook/useAuth";
import { NotAuth as NotAuthWidget } from "./NotAuth";

const NotAuth: FC = () => {
  const { user, loading } = useAuth();

  //if (user !== null) return;

  return <NotAuthWidget loading={loading} />;
};

export default NotAuth;
