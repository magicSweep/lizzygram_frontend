import CircularProgress from "@mui/material/CircularProgress";
import React, { memo, lazy, Suspense } from "react";
//import WallOfPhotos from "./WallOfPhotos";
import { useAuth } from "../../../../auth/hook/useAuth";
//import Fallback from "./../WallOfPhotos.fallback";
//import loadable from "@loadable/component";

const LoadableWallOfPhotos = lazy(() => import("./WallOfPhotos"));

const Fallback = () => (
  <div className="m-auto pt-8 flex justify-center items-center">
    <CircularProgress size={20} thickness={2.4} />
  </div>
);

export const WallOfPhotosLoadableWrapper = () => {
  const { isAuth } = useAuth();

  console.log("[RENDER WallOfPhotosLoadableWrapper MAIN]", isAuth);

  if (isAuth === false) return null;

  return (
    <Suspense fallback={<Fallback />}>
      <LoadableWallOfPhotos />
    </Suspense>
  );
};

export default memo(WallOfPhotosLoadableWrapper);
