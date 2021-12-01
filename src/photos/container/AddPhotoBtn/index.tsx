import React, { lazy, Suspense } from "react";
//import { shallowEqual, useSelector } from "react-redux";
//import { GlobalState } from "../../../types";
import { useAuth } from "./../../../auth";

const LoadableAddPhotoBtn = lazy(() => import("./AddPhotoBtn"));

const AddPhotoBtn = () => {
  const { isAuth } = useAuth();
  /* const isAuth = useSelector<GlobalState, boolean>(
    (state) => state.auth.user !== undefined,
    shallowEqual
  ); */

  if (isAuth === false) return null;

  return (
    <Suspense fallback={null}>
      <LoadableAddPhotoBtn />
    </Suspense>
  );
};

export default AddPhotoBtn;
