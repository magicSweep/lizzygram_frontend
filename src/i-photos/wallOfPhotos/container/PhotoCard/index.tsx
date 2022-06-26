import React, { ComponentProps, FC } from "react";
import { Photo, FirestoreDate } from "lizzygram-common-data/dist/types";
import PhotoCardWidget from "../../component/PhotoCard";
import { useWallOfPhotosContext } from "../../hook/useWallOfPhotosContext";

export type PhotoCardProps = {
  index: number;
  photo: Photo<FirestoreDate>;
};

const PhotoCard: FC<PhotoCardProps> = ({ photo, index }) => {
  const {
    downloadPhotoUrl,
    photoCardWidth,
    photoCardHeight,
    isEditor,
    userUid,
    showEditPhotoForm,
    showPhotoSlider,
    //loadingFavorite,
    favoriteReqs,
    addToFavorite,
    removeFromFavorite,
  } = useWallOfPhotosContext();

  return (
    <PhotoCardWidget
      {...photo}
      isEditable={photo.addedByUserUID === userUid}
      index={index}
      downloadPhotoUrl={downloadPhotoUrl}
      photoCardWidth={photoCardWidth}
      photoCardHeight={photoCardHeight}
      isEditor={isEditor === true}
      userUid={userUid}
      onEditClick={showEditPhotoForm as any}
      onImageClick={showPhotoSlider as any}
      //loadingFavorite,
      favoriteReqs={favoriteReqs}
      addToFavorite={addToFavorite}
      removeFromFavorite={removeFromFavorite}
    />
  );
};

export default PhotoCard;
