//import { memo } from "react";
import Skeleton from "@mui/material/Skeleton";
import React, { FC } from "react";

export const PhotoCardSkeleton: FC<{
  photoCardWidth: number;
  photoCardHeight: number;
}> = ({ photoCardWidth, photoCardHeight }) => {
  return (
    <Skeleton
      variant="rectangular"
      animation="wave"
      height={photoCardHeight}
      width={photoCardWidth}
    />
  );
};

export default PhotoCardSkeleton;
