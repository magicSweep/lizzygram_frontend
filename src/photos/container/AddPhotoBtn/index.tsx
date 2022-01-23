import React, { useState, useEffect } from "react";
//import { shallowEqual, useSelector } from "react-redux";
//import { GlobalState } from "../../../types";
import { useAuth } from "./../../../auth/hook/useAuth";
import loadable from "@loadable/component";

const LoadableAddPhotoBtn = loadable(() => import("./AddPhotoBtn"));

const AddPhotoBtn = () => {
  const { isAuth } = useAuth();

  if (isAuth === false) return null;

  return <LoadableAddPhotoBtn />;
};

export default AddPhotoBtn;
