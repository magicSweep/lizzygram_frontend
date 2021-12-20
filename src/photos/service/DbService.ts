import {
  getAllBySearchTerms,
  addOne,
  getById,
  editOne,
} from "../repository/firestore";
/* import {
  getAllBySearchTerms,
  addOne,
  getById,
  editOne,
} from "../repository/firestore.fake"; */
//import { numberOfPhotosPerQuery } from "../../config";
import { Photo, EditPhotoFirestoreRequestBody } from "../types";
import { SearchTerms } from "../../search/types";
import { initSearchState } from "../../search";

export const getAllPhotos = (
  searchState: SearchTerms,
  nextPageDocRef?: any
) => {
  return getAllBySearchTerms(
    searchState,
    initSearchState.terms,
    nextPageDocRef
  );
};

export const addPhoto = (photo: Photo<Date>) => {
  return addOne(photo);
};

export const editPhoto = (data: EditPhotoFirestoreRequestBody) => {
  return editOne(data);
};

export const getPhotoById = (id: string) => {
  return getById(id);
};
