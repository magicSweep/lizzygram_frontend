import { FC } from "react";
//import PhotoCard from "../../../component/PhotoCard";
import PhotoCard from "../../../component/PhotoCard";
import PhotoCardSkeletons, {
  PhotoCardSkeleton,
} from "../../../component/PhotoCardSkeletons";
//import { numberOfPhotosPerQuery } from "../../../../../config";
//import classes from "./PhotoCards.module.scss";
//import Card from "@material-ui/core/Card";
import { Photo, FirestoreDate } from "../../../types";

export interface PhotoCardsProps {
  //tagsState: ITagsState;
  numberOfPhotosPerQuery: number;
  isShowPhotoSlider: boolean;
  indexObservable: number;
  photos: Photo<FirestoreDate>[];
  showPhotoSlider: (event: MouseEvent) => void;
  showEditPhotoForm: () => void;
  //showPhotoDesc: (photo: TPhotoData) => void;
  userUID: string;
  editedPhotoIds: string[];
  numberOfAddedPhotos: number;
}

const PhotoCards: FC<PhotoCardsProps> = ({
  //tagsState,
  isShowPhotoSlider,
  indexObservable,
  photos,
  showPhotoSlider,
  showEditPhotoForm,
  numberOfPhotosPerQuery,
  //showPhotoDesc,
  userUID,
  editedPhotoIds,
  numberOfAddedPhotos,
}) => {
  const elements: any[] = [];
  //let index = 0;
  let photoCardIndex = 1;

  /*  if (isShowPhotoSlider) {
    const size = photos.length;

    for (let i = 0; i < size; i++) {
      elements.push(
        <div
          key={`photo_card_wrapper_${i}`}
          className="w-345 mr-6 mb-6 h-310"
          data-observer-index={photoCardIndex}
          id={`OBSERVER_${photoCardIndex}`}
        ></div>
      );

      index++;
      photoCardIndex = index + 1;
    }

    return <>{elements}</>;
  } */

  photos.forEach((photo, index) => {
    const isRender =
      !isShowPhotoSlider &&
      photoCardIndex > indexObservable - numberOfPhotosPerQuery &&
      photoCardIndex <= indexObservable + numberOfPhotosPerQuery;

    /*   if (!isRender) {
      elements.push(
        <Card
          key={id}
          className={classes.root}
          data-observer-index={photoCardIndex}
          id={`OBSERVER_${photoCardIndex}`}
        ></Card>
      );
    } else */ if (
      editedPhotoIds.length > 0 &&
      editedPhotoIds.includes(photo.id)
    ) {
      elements.push(
        <div className="ml-2 mb-2">
          <PhotoCardSkeleton key={photo.id} />
        </div>
      );
    } else {
      elements.push(
        <div className="ml-2 mb-2">
          <PhotoCard
            key={photo.id}
            isEditable={userUID === photo.addedByUserUID}
            photo={photo}
            onImageClick={showPhotoSlider}
            showEditPhotoForm={showEditPhotoForm}
            index={index}
            observerIndex={photoCardIndex}
            observerId={`OBSERVER_${photoCardIndex}`}
            isRender={
              isShowPhotoSlider === true
                ? false
                : isRender === false
                ? isRender
                : undefined
            }
            //alt="Лиза что-то делает"
          />
        </div>
      );
    }

    index++;
    photoCardIndex = index + 1;
  });

  return (
    <>
      {numberOfAddedPhotos > 0 && (
        <PhotoCardSkeletons numberOfSkeletons={numberOfAddedPhotos} />
      )}
      {elements}
    </>
  );
};

export default PhotoCards;
