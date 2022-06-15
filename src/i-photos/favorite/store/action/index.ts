import { FavoriteAction } from "../../types";

export const favoritePhotoStartRequestAC = (
  photoId: string
): FavoriteAction => {
  return {
    type: "FAVORITE_REQUEST_START",
    photoId,
  };
};

//FAVORITE_REQUEST_ERROR
export const favoritePhotoErrorRequestAC = (
  photoId: string
): FavoriteAction => {
  return {
    type: "FAVORITE_REQUEST_ERROR",
    photoId,
  };
};

export const favoritePhotoSuccessRequestAC = (
  photoId: string,
  userUid: string
): FavoriteAction => {
  return {
    type: "FAVORITE_REQUEST_SUCCESS",
    photoId,
    userUid,
  };
};
