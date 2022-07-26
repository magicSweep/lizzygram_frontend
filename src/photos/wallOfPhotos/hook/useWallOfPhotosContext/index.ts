import { useContext } from "react";
import { WallOfPhotosContext } from "../../container/WallOfPhotos.provider";

export const useWallOfPhotosContext = () => {
  const state = useContext(WallOfPhotosContext);

  return state;
};
