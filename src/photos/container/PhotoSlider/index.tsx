import React, { lazy, Suspense } from "react";
import { useSelector } from "react-redux";
import ModalFallback from "../../../component/ModalFallback";
//import WallOfPhotos from "./WallOfPhotos";
//import { useAuth } from "../../../auth/hook/useAuth";
import { GlobalState } from "../../../types";

const LoadableModalPhotoSlider = lazy(() => import("./PhotoSlider"));

let isInit = false;

export const PhotoSliderLoadableWrapper = () => {
  console.log("[PHOTO SLIDER LOADABLE WRAPPER]");

  const isShow = useSelector<GlobalState, boolean>(
    (state) => state.photos.showPhotoSlider
  );

  if (isShow === true && isInit === false) isInit = true;

  if (isInit === false) return null;

  console.log("[PHOTO SLIDER LOADABLE WRAPPER]", isShow);

  return (
    <Suspense fallback={<ModalFallback />}>
      <LoadableModalPhotoSlider /* isShowPhotoSlider={isShow} */ />
    </Suspense>
  );
};

export default PhotoSliderLoadableWrapper;
