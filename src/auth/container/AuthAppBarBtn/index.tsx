import React, { memo } from "react";
import AuthAppBarBtnWidget from "./AuthAppBarBtn";
import { useAuthAppBarBtn } from "./hook";

export const AuthAppBarBtn = () => {
  const { user, loading, login, logout } = useAuthAppBarBtn();

  return (
    <AuthAppBarBtnWidget
      user={user}
      loading={loading}
      login={login as any}
      logout={logout as any}
    />
  );
};

export default memo(AuthAppBarBtn);
