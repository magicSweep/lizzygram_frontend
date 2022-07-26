import React, { ComponentProps, FC, useCallback } from "react";
import {
  Photo,
  FirestoreDate,
  FavoriteData,
} from "lizzygram-common-data/dist/types";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import EditIcon from "@mui/icons-material/Edit";
//import WallOfPhotosImg from "../../../../component/images/WallOfPhotosImg";
import Image from "../../../../component/images/Image";
import { getImageSizeStyle } from "../../../../component/images/helper";
import DescTooltipedIcon from "../DescTooltipedIcon";
import DownloadPhotoIcon from "../../../photoSlider/component/DownloadPhoto/Icon";
import { FavoriteIconBtn } from "../../../favorite";
import { FavoriteReqs } from "../../../favorite/types";
//import Box from "@mui/system/Box";
//import styled from "@emotion/styled";
//import Favorite, { FavoriteProps } from "../../../component/Favorite";
import Skeleton from "@mui/material/Skeleton";

export const PhotoCardSkeleton: FC = () => {
  return (
    <Skeleton
      variant="rectangular"
      animation="wave"
      height="100%"
      width="100%"
    />
  );
};

export type PhotoCardProps = Omit<
  ComponentProps<typeof DownloadPhotoIcon>,
  "placement"
> & {
  base64: Photo<any>["base64"];
  iconSrc: Photo<any>["iconSrc"];
  aspectRatio: Photo<any>["aspectRatio"];
  favoriteBy?: Photo<any>["favoriteBy"];
  id: Photo<any>["id"];
  tags: Photo<any>["tags"];
  description: Photo<any>["description"];
  date: Photo<FirestoreDate>["date"];
  addedByUserUID: Photo<FirestoreDate>["addedByUserUID"];
  //photo: Photo<FirestoreDate>;
  //downloadPhotoData: DownloadOriginalPhotoData;
  userUid: string;
  //isEditable: boolean;
  isEditor: boolean;
  index: number;
  photoCardWidth: number;
  photoCardHeight: number;
  onImageClick?: (photoIndex: number) => void;
  onEditClick: (photoId: string) => void;
  //loadingFavorite: boolean;
  favoriteReqs: FavoriteReqs;
  addToFavorite: (photoId: string, favoriteBy?: FavoriteData) => Promise<void>;
  removeFromFavorite: (
    photoId: string,
    favoriteBy?: FavoriteData
  ) => Promise<void>;
};

/* const Wrapper = styled("div")<any>(({ theme, ...props }) => ({
  width: props.photoCardWidth,
  height: props.photoCardHeight,
})); */

export const PhotoCard: FC<PhotoCardProps> = ({
  iconSrc,
  aspectRatio,
  favoriteBy,
  id: photoId,
  tags: photoTags,
  description,
  googleDriveId,
  imageExtension,
  date: photoDate,

  ///
  downloadPhotoUrl,
  photoCardWidth,
  photoCardHeight,
  addedByUserUID,
  isEditor,
  index,
  userUid,
  onEditClick,
  onImageClick,
  //loadingFavorite,
  favoriteReqs,
  addToFavorite,
  removeFromFavorite,
}) => {
  let imageSize = getImageSizeStyle(aspectRatio, {
    width: photoCardWidth,
    height: photoCardHeight,
  });

  const date: Date = photoDate.toDate();

  /*  const addToFavorite = useCallback(() => {
    return addFavorite(photo.id, photo.favoriteBy);
  }, [photo]);

  const removeFromFavorite = useCallback(() => {
    return removeFavorite(photo.id, photo.favoriteBy);
  }, [photo]); */

  const onImageClick_ = useCallback(() => {
    if (onImageClick !== undefined) onImageClick(index);
  }, [index]);

  const onEditClick_ = useCallback(() => {
    if (onEditClick !== undefined) onEditClick(photoId);
  }, [photoId]);

  return (
    <>
      <Image
        src={iconSrc}
        srcSet={""}
        data-index={index}
        onClick={onImageClick_}
        loading="lazy"
        alt={description ? description : "Что-то изображено..."}
        {...imageSize}
      />

      {/*  <AlterativeWallOfPhotosImg
        containerWidth={photoCardWidth}
        containerHeight={photoCardHeight}
        base64={base64}
        src={iconSrc}
        srcSet={""}
        data-index={index}
        photoAspectRatio={aspectRatio}
        onClick={onImageClick_}
        alt="Фотография"
      /> */}
      <div className="absolute left-0 right-0 px-4 bottom-0 bg-photocard opacity-50 flex items-center justify-between h-12">
        <span className="flex space-x-4">
          {isEditor === true && addedByUserUID === userUid && (
            <Tooltip title="Редактировать">
              <IconButton
                onClick={onEditClick_}
                aria-label="edit photo"
                //sx={{ ml: "14px" }}
              >
                <EditIcon sx={{ fill: "white" }} fontSize="small" />
              </IconButton>
            </Tooltip>
          )}

          {isEditor === true && (
            <DownloadPhotoIcon
              downloadPhotoUrl={downloadPhotoUrl}
              googleDriveId={googleDriveId}
              imageExtension={imageExtension}
              placement="bottom"
            />
          )}

          {isEditor === true && (
            <FavoriteIconBtn
              add={addToFavorite}
              remove={removeFromFavorite}
              favoriteReqs={favoriteReqs}
              favoriteBy={favoriteBy}
              photoId={photoId}
              userUid={userUid}
              placement="bottom"
            />
          )}
        </span>
        <DescTooltipedIcon
          date={date}
          desc={description}
          photoTags={photoTags}
        />
      </div>
    </>
  );
};

/* const PhotoCardWithSkeleton: FC<PhotoCardProps & { isSkeleton: boolean }> = ({
  isSkeleton,
  ...props
}) => {
  return (
    <Wrapper
      photoCardWidth={`${props.photoCardWidth}px`}
      photoCardHeight={`${props.photoCardHeight}px`}
      className={`relative  ${
        isSkeleton === true ? "bg-transparent" : "bg-photocard"
      } text-white overflow-hidden flex items-center justify-center rounded-sm shadow-md`}
    >
      {isSkeleton === true && <PhotoCardSkeleton />}

      {isSkeleton === false && <PhotoCard {...props} />}
    </Wrapper>
  );
};

export default PhotoCardWithSkeleton; */
