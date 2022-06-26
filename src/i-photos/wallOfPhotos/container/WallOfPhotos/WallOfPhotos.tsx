import React from "react";
import WallOfPhotosWidget from "./WallOfPhotosWidget";
import { WallOfPhotosProvider } from "./../WallOfPhotos.provider";

export const WallOfPhotos = () => {
  //console.log("[RENDER WALL_OF_PHOTS]", props);

  return (
    <WallOfPhotosProvider>
      <WallOfPhotosWidget />
    </WallOfPhotosProvider>
  );
};

export default WallOfPhotos;
