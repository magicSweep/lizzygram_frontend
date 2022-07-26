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
import Box from "@mui/system/Box";
//import Favorite, { FavoriteProps } from "../../../component/Favorite";

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
  //photo: Photo<FirestoreDate>;
  //downloadPhotoData: DownloadOriginalPhotoData;
  userUid: string;
  isEditable: boolean;
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

const PhotoCard: FC<PhotoCardProps> = ({
  //base64,
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
  isEditable,
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
    console.log("ON IMAGE CLICK...", index);
    if (onImageClick !== undefined) onImageClick(index);
  }, [index]);

  const onEditClick_ = useCallback(() => {
    if (onEditClick !== undefined) onEditClick(photoId);
  }, [photoId]);

  return (
    <Box
      width={`${photoCardWidth}px`}
      height={`${photoCardHeight}px`}
      className="relative  bg-photocard text-white overflow-hidden flex items-center justify-center rounded-sm shadow-md"
    >
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
          {isEditor === true && isEditable === true && (
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
    </Box>
  );
};

export default PhotoCard;
