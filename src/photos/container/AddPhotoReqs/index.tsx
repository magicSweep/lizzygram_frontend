import React from "react";
import { useSelector } from "react-redux";
import ModalFallback from "../../../component/ModalFallback";
import { GlobalState } from "../../../types";
import loadable from "@loadable/component";

const LoadableAddPhotoReqs = loadable(() => import("./AddPhotoReqs"), {
  fallback: <ModalFallback />,
});

let isInit = false;

const AddPhotoReqs = () => {
  const requests = useSelector<GlobalState, string[]>(
    (state) => state.photos.addReqs.reqIds
  );

  if (isInit === false) {
    if (requests.length === 0) return null;
    else isInit = true;
  }

  return <LoadableAddPhotoReqs requests={requests} />;
};

export default AddPhotoReqs;
