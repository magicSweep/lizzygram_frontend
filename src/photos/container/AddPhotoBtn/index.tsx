import React, { memo, lazy, Suspense } from "react";
//import { shallowEqual, useSelector } from "react-redux";
//import { GlobalState } from "../../../types";
import { useAuth } from "./../../../auth/hook/useAuth";
//import loadable from "@loadable/component";

const LoadableAddPhotoBtn = lazy(() => import("./AddPhotoBtn"));

const AddPhotoBtn = () => {
  const { isAuth } = useAuth();

  if (isAuth === false) return null;

  return (
    <Suspense fallback={null}>
      <LoadableAddPhotoBtn />
    </Suspense>
  );
};

export default memo(AddPhotoBtn);
