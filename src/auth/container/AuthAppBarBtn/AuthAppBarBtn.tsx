import React, { FC, lazy, Suspense } from "react";
import LoadingWrapperWidget from "../../../component/LoadingWrapper/LoadingWrapperWidget";
import { LockIconBtn } from "../../component/LockIconBtn";
import { UserResponseToClient } from "../../types";

export interface AuthFragmentProps {
  user: UserResponseToClient | undefined;
  loading: boolean;
  login: () => void;
  logout: () => void;
}

const LazyTooltipedLockIconBtn = lazy(
  () => import("../../component/TooltipedLockIconBtn")
);

const LazyAccountBtnWithLoadableMenu = lazy(
  () => import("../AccountBtnLoadableMenu")
);

const Fallback = () => (
  <div className="inline-block relative">
    <LoadingWrapperWidget circle={true} />
    <LockIconBtn disabled={true} />
  </div>
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
        {loading && <LoadingWrapperWidget circle={true} />}
        {!loading && (
          <Suspense fallback={<LockIconBtn onClick={login} />}>
            <LazyTooltipedLockIconBtn onClick={login} />
          </Suspense>
        )}

        {loading && <LockIconBtn disabled={true} onClick={login} />}
      </div>
    );
  }
};

export default AuthAppBarBtn;
