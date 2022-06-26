import React, { memo, lazy, Suspense } from "react";
import { useSelector } from "react-redux";
import ModalFallback from "../../../../component/ModalFallback";
//import WallOfPhotos from "./WallOfPhotos";
//import { useAuth } from "../../../auth/hook/useAuth";
import { GlobalState } from "../../../../types";
//import loadable from "@loadable/component";

// TODO: what we made with added photos
const LoadableModalPhotoSlider = lazy(() => import("./ModalPhotoSlider"));

let isInit = false;

export const PhotoSliderLoadableWrapper = () => {
  //console.log("[PHOTO SLIDER LOADABLE WRAPPER]");

  const isShow = useSelector<GlobalState, boolean>(
    (state) => state.photoSlider.show
  );

  if (isShow === true && isInit === false) isInit = true;

  if (isInit === false) return null;

  //console.log("[PHOTO SLIDER LOADABLE WRAPPER]", isShow);

  return (
    <Suspense fallback={<ModalFallback />}>
      <LoadableModalPhotoSlider show={isShow} />
    </Suspense>
  );
};

export default memo(PhotoSliderLoadableWrapper);
