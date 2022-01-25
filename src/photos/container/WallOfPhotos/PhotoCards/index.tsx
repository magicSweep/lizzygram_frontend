import React, { FC } from "react";
//import PhotoCard from "../../../component/PhotoCard";
import PhotoCard from "../../../component/PhotoCard";
import PhotoCardSkeletons, {
  PhotoCardSkeleton,
} from "../../../component/PhotoCardSkeletons";
//import { numberOfPhotosPerQuery } from "../../../../../config";
//import classes from "./PhotoCards.module.scss";
//import Card from "@material-ui/core/Card";
import { Photo, FirestoreDate } from "lizzygram-common-data/dist/types";

export interface PhotoCardsProps {
  //tagsState: ITagsState;
  //numberOfPhotosPerQuery: number;
  //isShowPhotoSlider: boolean;
  //indexObservable: number;
  photos: Photo<FirestoreDate>[];
  showPhotoSlider: (photoId: string) => void;
  showEditPhotoForm: (photoId: string) => void;
  //showPhotoDesc: (photo: TPhotoData) => void;
  userUID: string;
  editedPhotoIds: string[];
  //numberOfAddedPhotos: number;
}

const PhotoCards: FC<PhotoCardsProps> = ({
  //tagsState,
  //isShowPhotoSlider,
  //indexObservable,
  photos,
  showPhotoSlider,
  showEditPhotoForm,
  //numberOfPhotosPerQuery,
  //showPhotoDesc,
  userUID,
  editedPhotoIds,
  //numberOfAddedPhotos,
}) => {
  const elements: any[] = [];

  //console.log("RENDER PHOTO CARDS");

  photos.forEach((photo, index) => {
    if (
      photo === null ||
      (editedPhotoIds.length > 0 && editedPhotoIds.includes(photo.id))
    ) {
      elements.push(
        <div
          className="ml-2 mb-2"
          key={photo === null ? `added_photo_${index}` : photo.id}
        >
          <PhotoCardSkeleton />
        </div>
      );
    } else {
      const onShowPhotoSlider = () => showPhotoSlider(photo.id);
      const onShowEditPhotoForm = () => showEditPhotoForm(photo.id);

      elements.push(
        <div key={photo.id} className="ml-2 mb-2">
          <PhotoCard
            isEditable={userUID === photo.addedByUserUID}
            photo={photo}
            onImageClick={onShowPhotoSlider}
            showEditPhotoForm={onShowEditPhotoForm}
            index={index}
          />
        </div>
      );
    }

    index++;
    //photoCardIndex = index + 1;
  });

  return (
    <>
      {/*  {numberOfAddedPhotos > 0 && (
        <PhotoCardSkeletons numberOfSkeletons={numberOfAddedPhotos} />
      )} */}
      {elements}
    </>
  );
};

export default PhotoCards;
