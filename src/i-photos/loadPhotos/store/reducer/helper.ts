import { LoadPhotosState, PhotosAction, FavoriteReqs } from "./../../types";
import {
  Photo,
  FirestoreDate,
  FavoriteData,
} from "lizzygram-common-data/dist/types";

export const getPhotoIndexByPhotoId = (
  photos: Photo<FirestoreDate>[],
  photoId: string
) => {
  //console.log("------------getPhotoIndexByPhotoId", photoId);
  for (let i = 0; i < photos.length; i++) {
    if (photos[i].id === photoId) {
      //console.log("------------getPhotoIndexByPhotoId", i);
      return i;
    }
  }
};

export const onFetchMorePhotosRequestSuccess = (
  state: LoadPhotosState,
  action: PhotosAction
) => {
  // we combine photos in state with new photos
  //@ts-ignore
  const photos: IPhoto[] = [...state.photos, ...action.photos];

  //console.log("onFetchMorePhotosRequestSuccess", action, state, photos);

  return {
    ...state,
    photos,
    loading: false,
    error: false,
    nextPageDocRef: action.nextPageDocRef,
    hasNextPage: action.hasNextPage as boolean,
  };
};

//onAddPhoto
export const onAddPhoto = (
  state: LoadPhotosState,
  action: PhotosAction
): LoadPhotosState => {
  if (action.photo === undefined)
    throw new Error(`No photo  on ${action.type}`);

  const photos = state.photos
    ? [
        action.photo,
        //@ts-ignore
        ...state.photos,
      ]
    : [action.photo];

  return {
    ...state,
    photos,
  };
};

//GET_ADDED_PHOTO_SUCCESS
export const onEditPhoto = (
  state: LoadPhotosState,
  action: PhotosAction
): LoadPhotosState => {
  //console.log("-------------onEditPhotoSuccess", action);
  /*  if (typeof action.photoOrId === "string") {
    // IF WE HAVE PHOTO_ID IT MEANS THAT EDITED PHOTO
    // NOT IN SEARCH TERMS
    return {
      ...state,
      editReqs: {
        ...state.editReqs,
        activeReqIds: state.editReqs.activeReqIds.filter(
          (id) => id !== (action.photoOrId as string)
        ),
      },
      photos: (state.photos as Photo<FirestoreDate>[]).filter(
        (photo) => photo.id !== action.photoOrId
      ),
    };
  } else { */

  console.log("EDIT PHOTO");

  return {
    ...state,
    photos: (state.photos as Photo<FirestoreDate>[]).map((photo) =>
      photo.id === action.photo.id
        ? {
            ...photo,
            ...action.photo,
          }
        : photo
    ),
  };
};
