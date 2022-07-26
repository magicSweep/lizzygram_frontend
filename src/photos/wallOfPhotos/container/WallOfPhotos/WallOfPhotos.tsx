import React from "react";
import WallOfPhotosWidget from "./WallOfPhotosWidget";
//import { WallOfPhotosProvider } from "./../WallOfPhotos.provider";
import { useWallOfPhotos } from "../../hook/useWallOfPhotos";

export const WallOfPhotos = () => {
  //console.log("[RENDER WALL_OF_PHOTS]", props);

  const props = useWallOfPhotos();

  return <WallOfPhotosWidget {...props} />;
};

export default WallOfPhotos;
