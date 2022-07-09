import React, { ComponentProps, FC } from "react";
import { Photo, FirestoreDate } from "lizzygram-common-data/dist/types";
//import PhotoCardWidget from "../../component/PhotoCard";
//import { useWallOfPhotosContext } from "../../hook/useWallOfPhotosContext";
import {
  PhotoCardProps,
  PhotoCard,
  PhotoCardSkeleton,
} from "../../component/PhotoCardWithSkeleton";
import styled from "@emotion/styled";

export type PhotoCardWithSkeletonProps = Partial<PhotoCardProps> & {
  isSkeleton: boolean;
  index?: number;
  photo?: Photo<FirestoreDate>;
};

const Wrapper = styled("div")<any>(({ theme, ...props }) => ({
  width: props.photoCardWidth,
  height: props.photoCardHeight,
}));

const PhotoCardWithSkeleton: FC<
  Partial<PhotoCardProps> & { isSkeleton: boolean }
> = ({ isSkeleton, ...props }) => {
  if (props.index === 0) {
    console.log("[RENDER PHOTO CARD WITH SKELETON", isSkeleton);
  }

  return (
    <Wrapper
      photoCardWidth={`${props.photoCardWidth}px`}
      photoCardHeight={`${props.photoCardHeight}px`}
      className={`relative  ${
        isSkeleton === true ? "bg-transparent" : "bg-photocard"
      } text-white overflow-hidden flex items-center justify-center rounded-sm shadow-md`}
    >
      {isSkeleton === true && <PhotoCardSkeleton />}

      {isSkeleton === false && <PhotoCard {...(props as any)} />}
    </Wrapper>
  );
};

export default PhotoCardWithSkeleton;
