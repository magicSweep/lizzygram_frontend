import React, { FC } from "react";
import LoadingWrapperWidget from "../../../component/LoadingWrapper/LoadingWrapperWidget";
import { LockIconBtn } from "../../component/LockIconBtn";
import { UserResponseToClient } from "../../types";
import loadable from "@loadable/component";

export interface AuthFragmentProps {
  user: UserResponseToClient | undefined;
  loading: boolean;
  login: () => void;
  logout: () => void;
}

const Fallback = () => (
  <div className="inline-block relative">
    <LoadingWrapperWidget circle={true} />
    <LockIconBtn disabled={true} />
  </div>
);

const LazyTooltipedLockIconBtn = loadable(
  () => import("../../component/TooltipedLockIconBtn")
);

const LazyAccountBtnWithLoadableMenu = loadable(
  () => import("../AccountBtnLoadableMenu"),
  {
    fallback: <Fallback />,
  }
);

const AuthAppBarBtn: FC<AuthFragmentProps> = ({
  user,
  loading,
  login,
  logout,
}) => {
  if (!loading && user && user.uid) {
    //return <AccountBtnWithLoadableMenu userName={user.name} logout={logout} />;
    return (
      <LazyAccountBtnWithLoadableMenu userName={user.name} logout={logout} />
    );
  } else {
    return (
      <div className="inline-block relative">
        {loading === true && <LoadingWrapperWidget circle={true} />}
        {loading !== true && (
          <LazyTooltipedLockIconBtn
            fallback={<LockIconBtn onClick={login} />}
            onClick={login}
          />
        )}

        {loading === true && <LockIconBtn disabled={true} onClick={login} />}
      </div>
    );
  }
};

export default AuthAppBarBtn;
