import {
  getAllBySearchTerms,
  addOne,
  getOne,
  editOne,
} from "../repository/firestore";
/* import {
  getAllBySearchTerms,
  addOne,
  getOne,
  editOne,
} from "../repository/firestore.fake"; */
import { numberOfPhotosPerQuery } from "../../config";
import { Photo, EditPhotoFirestoreRequestBody } from "../types";
import { SearchTerms } from "../../search/types";
//import { initSearchState } from "../../search";

export const getAllPhotos = (
  searchTerms: SearchTerms,
  nextPageDocRef?: any
) => {
  return getAllBySearchTerms(
    searchTerms,
    nextPageDocRef,
    numberOfPhotosPerQuery
  );
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
