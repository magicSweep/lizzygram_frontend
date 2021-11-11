/* import {
  getAllBySearchTerms,
  addOne,
  getById,
  editOne
} from "../repository/FirestoreRepository"; */
import {
  getAllBySearchTerms,
  addOne,
  getById,
  editOne,
} from "../repository/FakeRepository";
import { numberOfPhotosPerQuery } from "../../config";
import { Photo, EditPhotoFirestoreData } from "../types";
import { SearchTerms } from "../../search/types";
import { initSearchState } from "../../search";

export const getAllPhotos = (
  searchState: SearchTerms,
  nextPageDocRef?: any
) => {
  return getAllBySearchTerms(
    searchState,
    numberOfPhotosPerQuery,
    initSearchState.terms,
    nextPageDocRef
  );
};

export const addPhoto = (photo: Photo<any>) => {
  return addOne(photo);
};

export const editPhoto = (data: EditPhotoFirestoreData) => {
  return editOne(data);
};

export const getPhotoById = (id: string) => {
  return getById(id);
};
