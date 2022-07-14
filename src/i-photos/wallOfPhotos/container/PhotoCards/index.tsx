import { FirestoreDate, Photo } from "lizzygram-common-data/dist/types";
import React, { FC, memo } from "react";
import { useWallOfPhotosContext } from "../../hook/useWallOfPhotosContext";
//import PhotoCard from "./../PhotoCard";
//import PhotoCardSkeleton from "./../PhotoCardSkeleton";
import PhotoCardWithSkeleton from "./../PhotoCardWithSkeleton";
import { getSlicedArrayOfPhotos } from "./PhotoCards.helper";

export type PhotoCardsProps = {
  //photos: Photo<FirestoreDate>[] | undefined;
  isLast?: boolean;
  //loading: boolean;
  numberOfPhotosInBlock: number;
  blockIndex?: number;
  //numberOfAddedPhotos: number;
  //editedPhotoIds: string[];
};

function areContentPropsEqual(prevProps, nextProps) {
  /*
  return true if passing nextProps to render would return
  the same result as passing prevProps to render,
  otherwise return false
  */

  return (
    prevProps.photos === nextProps.photos &&
    prevProps.isLast === nextProps.isLast &&
    prevProps.loading === nextProps.loading &&
    //prevProps.numberOfPhotosInBlock === nextProps.numberOfPhotosInBlock &&
    prevProps.blockIndex === nextProps.blockIndex &&
    prevProps.editedPhotoIds === nextProps.editedPhotoIds &&
    prevProps.numberOfAddedPhotos === nextProps.numberOfAddedPhotos
  );
}

const Content: FC<
  PhotoCardsProps & Partial<ReturnType<typeof useWallOfPhotosContext>>
> = memo(
  ({
    isLast,
    //loading,
    numberOfPhotosInBlock,
    blockIndex,
    photos,
    loading,
    numberOfAddedPhotos,
    editedPhotoIds,
    showPhotoSlider,
    ...photoCardProps
  }) => {
    let cards: any[] = [];

    console.log("[RENDER PHOTO CARDS CONTENT]");

    // WE LOAD MORE ITEMS OR IT'S INITIAL ITEMS LOADING
    if ((isLast === true || photos === undefined) && loading === true) {
      //console.log("getCards", numberOfItemsInBlock);
      cards = [...Array(numberOfPhotosInBlock).keys()].map((val, i) => {
        return (
          <div key={`photo_card_${i + 1}`} className="p-2">
            <PhotoCardWithSkeleton
              photoCardHeight={photoCardProps.photoCardHeight}
              photoCardWidth={photoCardProps.photoCardWidth}
              isSkeleton={true}
            />
          </div>
        );
      });
    } else if (photos === undefined) {
      console.error("ITEMS UNDEFINED");

      cards = null as any;
    } else {
      let photos_ = getSlicedArrayOfPhotos(
        photos,
        numberOfAddedPhotos as number,
        blockIndex as number,
        numberOfPhotosInBlock
      );

      cards = photos_.map((photo, i) => {
        const index = i + 1;
        const cardIndex = numberOfPhotosInBlock * (blockIndex as number) + i;

        if (photo === null || (editedPhotoIds as any[]).includes(photo.id)) {
          //addedIndex += 1;
          return (
            <div key={`photo_card_${index}`} className="p-2">
              <PhotoCardWithSkeleton
                photoCardHeight={photoCardProps.photoCardHeight}
                photoCardWidth={photoCardProps.photoCardWidth}
                isSkeleton={true}
              />
            </div>
          );
        }

        return (
          <div key={`photo_card_${index}`} className="p-2">
            <PhotoCardWithSkeleton
              isSkeleton={false}
              index={cardIndex}
              onImageClick={showPhotoSlider}
              {...photo}
              {...photoCardProps}
            />
          </div>
        );
      });
    }

    return <>{cards}</>;
  },
  areContentPropsEqual
);

function areEqual(prevProps, nextProps) {
  /*
  return true if passing nextProps to render would return
  the same result as passing prevProps to render,
  otherwise return false
  */

  return (
    prevProps.photos === nextProps.photos &&
    //prevProps.isLast === nextProps.isLast &&
    prevProps.loading === nextProps.loading &&
    prevProps.numberOfPhotosInBlock === nextProps.numberOfPhotosInBlock &&
    prevProps.blockIndex === nextProps.blockIndex &&
    prevProps.editedPhotoIds === nextProps.editedPhotoIds &&
    prevProps.numberOfAddedPhotos === nextProps.numberOfAddedPhotos
  );
}

/* const Wrapper: FC<{ children: any; index: number }> = ({ children, index }) => {
  console.log("[WRAPPER KEY]", index);

  return (
    <div key={`photo_card_${index}`} className="p-2">
      {children}
    </div>
  );
}; */

let count = 0;

const PhotoCards: FC<PhotoCardsProps> = ({
  // photos,
  isLast,
  //loading,
  numberOfPhotosInBlock,
  blockIndex,
  // numberOfAddedPhotos,
  // editedPhotoIds,
}) => {
  /* const {
    photos,
    loading,
    numberOfAddedPhotos,
    editedPhotoIds,
    showPhotoSlider,
    ...photoCardProps
    /* downloadPhotoUrl,
    photoCardWidth,
    photoCardHeight,
    isEditor,
    userUid,
    showEditPhotoForm,
    showPhotoSlider,
    //loadingFavorite,
    favoriteReqs,
    addToFavorite,
    removeFromFavorite, /
  } = useWallOfPhotosContext(); */

  const props = useWallOfPhotosContext();

  count++;
  console.log("[RENDER PHOTO CARDS]", count);

  return (
    <Content
      isLast={isLast}
      numberOfPhotosInBlock={numberOfPhotosInBlock}
      blockIndex={blockIndex}
      {...props}
    />
  );
};

export default memo(PhotoCards, areEqual);

/* import { FirestoreDate, Photo } from "lizzygram-common-data/dist/types";
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
  /

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

const Wrapper: FC<{ children: any; index: number }> = ({ children, index }) => {
  console.log("[WRAPPER KEY]", index);

  return (
    <div key={`photo_card_${index}`} className="p-2">
      {children}
    </div>
  );
};

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

  console.log("[RENDER PHOTO CARDS]", blockIndex, numberOfPhotosInBlock);

  if (numberOfPhotosInBlock === 0) return null;

  // WE LOAD MORE ITEMS OR IT'S INITIAL ITEMS LOADING
  if ((isLast === true || photos === undefined) && loading === true) {
    //console.log("getCards", numberOfItemsInBlock);
    cards = [...Array(numberOfPhotosInBlock).keys()].map((val, i) => {
      return (
        <div key={`photo_card_${i + 1}`} className="p-2">
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

      if (photo === null || editedPhotoIds.includes(photo.id)) {
        //addedIndex += 1;
        return (
          <div key={`photo_card_${index}`} className="p-2">
            <PhotoCardSkeleton />
          </div>
        );
      }

      return (
        <div key={`photo_card_${index}`} className="p-2">
          <PhotoCard photo={photos_[index - 1]} index={cardIndex} />
        </div>
      );
    });
  }

  return <>{cards}</>;
};

export default memo(PhotoCards, areEqual);
 */
