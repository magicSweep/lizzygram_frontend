import React, { memo, lazy, Suspense } from "react";
//import { shallowEqual, useSelector } from "react-redux";
//import { GlobalState } from "../../../types";
//import { useLocation } from "@reach/router";
import { useAuth } from "../../../auth/hook/useAuth";
//import loadable from "@loadable/component";

const LoadableSearchBtn = lazy(() => import("./SearchBtn"));

const SearchBtn = () => {
  const { isAuth } = useAuth();
  /* const isAuth = useSelector<GlobalState, boolean>(
    (state) => state.auth.user !== undefined,
    shallowEqual
  ); */

  //const location = useLocation();

  if (isAuth === false) return null;

  if (typeof window === "undefined" || location.pathname !== "/") {
    return null;
  }

  return (
    <Suspense fallback={null}>
      <LoadableSearchBtn />
    </Suspense>
  );
};

export default memo(SearchBtn);
