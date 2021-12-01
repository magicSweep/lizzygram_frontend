import React, { lazy, Suspense } from "react";
//import WallOfPhotos from "./WallOfPhotos";
import { useAuth } from "../../../auth/hook/useAuth";
import Fallback from "./Fallback";

const LoadableWallOfPhotos = lazy(() => import("./WallOfPhotos"));

export const WallOfPhotosLoadableWrapper = () => {
  const { userUid } = useAuth();

  //console.log("[RENDER WALL_OF_PHOTS MAIN]", userUid);

  if (userUid !== "")
    return (
      <Suspense fallback={<Fallback />}>
        <LoadableWallOfPhotos />
      </Suspense>
    );

  return null;
};

export default WallOfPhotosLoadableWrapper;
