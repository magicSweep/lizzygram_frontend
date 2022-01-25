import React, { FC, lazy, Suspense } from "react";
import LoadingWrapperWidget from "../../../component/LoadingWrapper/LoadingWrapperWidget";
import { LockIconBtn } from "../../component/LockIconBtn";
import { UserResponseToClient } from "../../types";
//import loadable from "@loadable/component";
import Fallback from "./AuthAppBarBtnFallback";

export interface AuthFragmentProps {
  user: UserResponseToClient | undefined;
  loading: boolean;
  login: () => void;
  logout: () => void;
}

/* export const Fallback = () => (
  <div className="inline-block relative">
    <LoadingWrapperWidget circle={true} />
    <LockIconBtn disabled={true} />
  </div>
); */

const LazyTooltipedLockIconBtn = lazy(
  () => import("../../component/TooltipedLockIconBtn")
);

const LazyAccountBtnWithLoadableMenu = lazy(
  () => import("../AccountBtnLoadableMenu")
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
      <Suspense fallback={<Fallback />}>
        <LazyAccountBtnWithLoadableMenu userName={user.name} logout={logout} />
      </Suspense>
    );
  } else {
    return (
      <div className="inline-block relative">
        {loading === true && <LoadingWrapperWidget circle={true} />}
        {loading !== true && (
          <Suspense fallback={<LockIconBtn onClick={login} />}>
            <LazyTooltipedLockIconBtn onClick={login} />
          </Suspense>
        )}

        {loading === true && <LockIconBtn disabled={true} onClick={login} />}
      </div>
    );
  }
};

export default AuthAppBarBtn;
