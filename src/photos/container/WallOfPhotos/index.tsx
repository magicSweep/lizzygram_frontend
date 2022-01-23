import React from "react";
//import WallOfPhotos from "./WallOfPhotos";
import { useAuth } from "../../../auth/hook/useAuth";
import Fallback from "./Fallback";
import loadable from "@loadable/component";

const LoadableWallOfPhotos = loadable(() => import("./WallOfPhotos"), {
  fallback: <Fallback />,
});

export const WallOfPhotosLoadableWrapper = () => {
  const { userUid } = useAuth();

  //console.log("[RENDER WALL_OF_PHOTS MAIN]", userUid);

  if (userUid !== "") return <LoadableWallOfPhotos />;

  return null;
};

export default WallOfPhotosLoadableWrapper;
