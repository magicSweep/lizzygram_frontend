import {
  getAllBySearchTerms,
  addOne,
  getOne,
  editOne,
} from "../repository/firestore";
import { numberOfPhotosPerQuery } from "../../config";
import { EditPhotoFirestoreRequestBody } from "../types";
import { Photo } from "lizzygram-common-data/dist/types";
import { SearchTerms } from "../../search/types";

export const getAllPhotos = (
  userUid: string,
  searchTerms: SearchTerms,
  nextPageDocRef?: any
) => {
  return getAllBySearchTerms(
    userUid,
    searchTerms,
    nextPageDocRef,
    numberOfPhotosPerQuery
  );
};

export const changeFavorites = (data: {
  photoId: string;
  fieldsToUpdate: {
    favoriteBy: Photo<any>["favoriteBy"];
  };
}) => {
  //
  return editOne(data);
};

/* export const getAllPhotos = (
  searchState: SearchTerms,
  nextPageDocRef?: any
) => {
  return getAllBySearchTerms(
    searchState,
    initSearchState.terms,
    nextPageDocRef
  );
}; */

export const addPhoto = (photo: Photo<Date>) => {
  return addOne(photo as any);
};

export const editPhoto = (data: EditPhotoFirestoreRequestBody) => {
  return editOne(data);
};

export const getPhoto = (id: string) => {
  return getOne(id);
};
