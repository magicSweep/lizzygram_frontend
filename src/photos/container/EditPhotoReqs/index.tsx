import React, { memo, lazy, Suspense } from "react";
import { useSelector } from "react-redux";
import ModalFallback from "../../../component/ModalFallback";
import { GlobalState } from "../../../types";
//import loadable from "@loadable/component";

const LoadableEditPhotoReqs = lazy(() => import("./EditPhotoReqs"));

let isInit = false;

const EditPhotoReqs = () => {
  const requests = useSelector<GlobalState, string[]>(
    (state) => state.photos.editReqs.reqIds
  );

  if (isInit === false) {
    if (requests.length === 0) return null;
    else isInit = true;
  }

  return (
    <Suspense fallback={<ModalFallback />}>
      <LoadableEditPhotoReqs requests={requests} />
    </Suspense>
  );
};

export default memo(EditPhotoReqs);
