import React, { memo, lazy, Suspense } from "react";
import { useSelector } from "react-redux";
import ModalFallback from "../../../component/ModalFallback";
import { GlobalState } from "../../../types";
//import loadable from "@loadable/component";

const LoadableModalSearchPhotoForm = lazy(
  () => import("./ModalSearchPhotoForm")
);

let isInit = false;

export const SearchPhotoForm = () => {
  //console.log("[RENDER WALL_OF_PHOTS]");

  const isShow = useSelector<GlobalState, boolean>(
    (state) => state.search.showForm
  );

  if (isShow === true && isInit === false) isInit = true;

  if (isInit === false) return null;

  return (
    <Suspense fallback={<ModalFallback />}>
      <LoadableModalSearchPhotoForm isShow={isShow} />
    </Suspense>
  );
};

export default memo(SearchPhotoForm);
