import React, { ComponentProps, FC } from "react";
import PhotoCardSkeletonWidget from "../../component/PhotoCardSkeleton";
import { useWallOfPhotosContext } from "../../hook/useWallOfPhotosContext";

export const PhotoCardSkeleton: FC = () => {
  const { photoCardHeight, photoCardWidth } = useWallOfPhotosContext();

  return (
    <PhotoCardSkeletonWidget
      photoCardHeight={photoCardHeight}
      photoCardWidth={photoCardWidth}
    />
  );
};

export default PhotoCardSkeleton;
