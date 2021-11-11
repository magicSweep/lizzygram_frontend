import { flow } from "lodash-es";
import {
  tagsCollectionName,
  photosCollectionName,
  numberOfPhotosPerQuery,
} from "../../config";
import {
  Photo,
  GetAllPhotosResData,
  FirestoreDate,
  EditPhotoFirestoreData,
} from "../types";
import { SearchTerms } from "./../../search/types";
import { photos, addedPhoto } from "../mock/fake.data";
import { isInitState } from "./helper";

export const getAllBySearchTerms = (
  searchTerms: SearchTerms,
  numberOfPhotosPerQuery: number,
  initSearchTerms: SearchTerms,
  nextPageDocRef?: any
): Promise<GetAllPhotosResData> => {
  //const _isInitState = isInitState(initSearchState, searchState);

  // MAKE RESPONSE

  let resPhotos: Photo<FirestoreDate>[] = [];
  let ourNextPageDocRef = "";

  if (nextPageDocRef) {
    // LOAD MORE PHOTOS
    let isAfter = false;
    photos.forEach((photo) => {
      if (photo.id === nextPageDocRef) isAfter = true;

      if (isAfter === true) resPhotos.push(photo);
    });

    if (numberOfPhotosPerQuery >= resPhotos.length) {
      //resPhotos = photos;
    } else {
      resPhotos = resPhotos.filter(
        (photo, index) => index <= numberOfPhotosPerQuery
      );
      const nextPhoto = resPhotos.pop();

      ourNextPageDocRef = (nextPhoto as Photo<FirestoreDate>).id;
    }
  } else {
    // LOAD PHOTOS
    if (numberOfPhotosPerQuery >= photos.length) {
      resPhotos = photos;
    } else {
      resPhotos = photos.filter(
        (photo, index) => index <= numberOfPhotosPerQuery
      );
      const nextPhoto = resPhotos.pop();

      ourNextPageDocRef = (nextPhoto as Photo<FirestoreDate>).id;
    }
  }

  return new Promise((res, rej) => {
    setTimeout(() => {
      res({
        hasNextPage: ourNextPageDocRef ? true : false,
        nextPageDocRef: ourNextPageDocRef,
        photos: resPhotos,
      });
    }, 2000);
  });
};

export const addOne = (photo: Photo<FirestoreDate>) => {
  return new Promise((res, rej) => {
    setTimeout(() => {
      res(true);
    }, 2000);
  });
};

export const editOne = (data: EditPhotoFirestoreData) => {
  return new Promise((res, rej) => {
    setTimeout(() => {
      res(true);
    }, 2000);
  });
};

export const getById = async (id: string): Promise<Photo<FirestoreDate>> => {
  return new Promise((res, rej) => {
    setTimeout(() => {
      addedPhoto.id = id;
      res(addedPhoto);
    }, 2000);
  });
};
