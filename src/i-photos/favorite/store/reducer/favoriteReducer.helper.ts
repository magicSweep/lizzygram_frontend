import {
  FirestoreDate,
  Photo,
  FavoriteData,
} from "lizzygram-common-data/dist/types";
import { FavoriteReqs } from "../../types";

export const updateFavoriteByOnPhotos = (
  photos: Photo<FirestoreDate>[],
  photoId: string,
  userUid: string
) => {
  return photos.map((photo) => {
    if (photo.id === photoId) {
      if (
        photo.favoriteBy !== undefined &&
        photo.favoriteBy[userUid] === true
      ) {
        const newFavoriteBy = {};

        for (let prop in photo.favoriteBy) {
          if (prop !== userUid) newFavoriteBy[prop] = photo.favoriteBy[prop];
        }

        photo.favoriteBy = newFavoriteBy;
      } else {
        const newFavoriteBy: FavoriteData = {
          ...photo.favoriteBy,
          [userUid]: true,
        };
        photo.favoriteBy = newFavoriteBy;
      }
    }

    return photo;
  });
};

export const deleteFromFavoriteReqs = (
  favoriteReqs: FavoriteReqs,
  actionPhotoId: string
) => {
  return favoriteReqs.filter((photoId) => photoId !== actionPhotoId);
};
