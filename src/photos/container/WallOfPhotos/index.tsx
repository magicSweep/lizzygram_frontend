import React from "react";
import WallOfPhotosWidget from "./WallOfPhotosWidget";
import { useWallOfPhotos } from "./hook";

export const WallOfPhotos = () => {
  const props = useWallOfPhotos();

  console.log("[RENDER WALL_OF_PHOTS]", props);

  return <WallOfPhotosWidget {...props} />;
};

export default WallOfPhotos;
