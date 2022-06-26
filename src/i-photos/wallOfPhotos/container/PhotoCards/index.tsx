import { FirestoreDate, Photo } from "lizzygram-common-data/dist/types";
import React, { FC, memo } from "react";
import PhotoCard from "./../PhotoCard";
import PhotoCardSkeleton from "./../PhotoCardSkeleton";
import { getSlicedArrayOfPhotos } from "./PhotoCards.helper";

export type PhotoCardsProps = {
  photos: Photo<FirestoreDate>[] | undefined;
  isLast?: boolean;
  loading: boolean;
  numberOfPhotosInBlock: number;
  blockIndex?: number;
  numberOfAddedPhotos: number;
  editedPhotoIds: string[];
};

function areEqual(prevProps, nextProps) {
  /*
  return true if passing nextProps to render would return
  the same result as passing prevProps to render,
  otherwise return false
  */

  return (
    prevProps.photos === nextProps.photos &&
    prevProps.isLast === nextProps.isLast &&
    prevProps.loading === nextProps.loading &&
    prevProps.numberOfPhotosInBlock === nextProps.numberOfPhotosInBlock &&
    prevProps.blockIndex === nextProps.blockIndex &&
    prevProps.editedPhotoIds === nextProps.editedPhotoIds &&
    prevProps.numberOfAddedPhotos === nextProps.numberOfAddedPhotos
  );
}

const PhotoCards: FC<PhotoCardsProps> = ({
  photos,
  isLast,
  loading,
  numberOfPhotosInBlock,
  blockIndex,
  numberOfAddedPhotos,
  editedPhotoIds,
}) => {
  let cards: any[] = [];

  //alert(`CARDS | ${numberOfPhotosInBlock}`);

  if (numberOfPhotosInBlock === 0) return null;

  // WE LOAD MORE ITEMS OR IT'S INITIAL ITEMS LOADING
  if ((isLast === true || photos === undefined) && loading === true) {
    //console.log("getCards", numberOfItemsInBlock);
    cards = [...Array(numberOfPhotosInBlock).keys()].map((val, i) => {
      return (
        <div key={`item_skeleton_${val}_ ${i}`} className="p-2">
          <PhotoCardSkeleton />
        </div>
      );
    });
  } else if (photos === undefined) {
    console.error("ITEMS UNDEFINED");

    cards = null as any;
  } else {
    let photos_ = getSlicedArrayOfPhotos(
      photos,
      numberOfAddedPhotos,
      blockIndex as number,
      numberOfPhotosInBlock
    );

    cards = photos_.map((photo, i) => {
      const index = i + 1;
      const cardIndex = numberOfPhotosInBlock * (blockIndex as number) + i;

      //console.log("CARD INDEX", cardIndex);

      if (photo === null || editedPhotoIds.includes(photo.id)) {
        //addedIndex += 1;
        return (
          <div key={`item_add_skeleton_ ${i}`} className="p-2">
            <PhotoCardSkeleton />
          </div>
        );
      }

      return (
        <div key={`item_${photo.id}_ ${i}`} className="p-2">
          <PhotoCard photo={photos_[index - 1]} index={cardIndex} />
        </div>
      );
    });
  }

  return <>{cards}</>;
};

export default memo(PhotoCards, areEqual);
