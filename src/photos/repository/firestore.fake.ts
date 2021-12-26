import { flow } from "lodash-es";
import {
  tagsCollectionName,
  photosCollectionName,
  //numberOfPhotosPerQuery,
} from "../../config";
import {
  Photo,
  GetAllPhotosResData,
  FirestoreDate,
  EditPhotoFirestoreRequestBody,
} from "../types";
import { SearchTerms } from "./../../search/types";
import { photos as photosToAdd } from "../mock/fake.data";
import { photos as initPhotos } from "../mock/photos.db";
import { OrderBy } from "../../firebase/types";
import { QuerySnapshot } from "firebase/firestore";
//import { isInitState } from "./helper";

const photos = [...initPhotos];

const newPhotos = [];

const isNeedSearch = (searchTerms: SearchTerms) => {
  return !(searchTerms.age === -1 && searchTerms.tags === undefined);
};

export const getAllBySearchTerms = async (
  searchTerms: SearchTerms,
  startAt: any,
  limit: number,
  orderBy?: OrderBy
): Promise<{ docs: Photo<FirestoreDate>[]; cursor: any }> => {
  let fPhotos: any[] = [];

  console.log(
    "------------IS NEED SEARCH",
    isNeedSearch(searchTerms),
    searchTerms
  );
  // FIRST WE MAKE PHOTOS WITH SEARCH CONDITIONS OR NOT
  if (isNeedSearch(searchTerms)) {
    fPhotos = photos.filter((photo) => {
      if (searchTerms.age !== -1 && searchTerms.age !== photo.yearsOld) {
        return false;
      }

      if (searchTerms.tags !== undefined) {
        for (let tagId in searchTerms.tags) {
          if (searchTerms.tags[tagId] === true && photo.tags[tagId] !== true)
            return false;
        }
      }

      return true;
    });
  } else {
    fPhotos = photos;
  }

  //console.log("-------------IS NEED SEARCH", isNeedSearch(searchTerms))

  // SECOND WE MAKE RESULT
  let resPhotos: Photo<FirestoreDate>[] = [];
  let ourNextPageDocRef: any = undefined;

  if (startAt !== undefined) {
    // LOAD MORE PHOTOS
    const nextIndex = fPhotos.findIndex((photo) => photo.id === startAt.id);

    resPhotos = fPhotos.slice(nextIndex, nextIndex + limit) as any;

    ourNextPageDocRef = fPhotos[nextIndex + limit];
  } else {
    // LOAD PHOTOS
    resPhotos = fPhotos.slice(0, limit) as any;

    ourNextPageDocRef = fPhotos[limit];
  }

  return new Promise((res, rej) => {
    setTimeout(() => {
      res({
        docs: resPhotos as any[],
        cursor: ourNextPageDocRef,
      });
      /* res({
        hasNextPage: ourNextPageDocRef ? true : false,
        nextPageDocRef: ourNextPageDocRef,
        photos: resPhotos,
      }); */
    }, 2000);
  });
};

let newPhotosIndex = 0;

export const addOne = (photo: Photo<FirestoreDate>) => {
  return new Promise((res, rej) => {
    setTimeout(() => {
      //photos.unshift(photo as any);
      const newPhoto = photosToAdd[newPhotosIndex];
      newPhoto.id = photo.id;

      newPhotos.unshift(newPhoto as any);

      newPhotosIndex++;

      res(true);
    }, 2000);
  });
};

export const editOne = (data: EditPhotoFirestoreRequestBody) => {
  const photoToEdit = photos.find((photo) => photo.id === data.photoId);

  const fieldsToUpdate = data.fieldsToUpdate;

  /* if (fieldsToUpdate.yearsOld !== undefined) {
    photoToEdit.yearsOld = fieldsToUpdate.yearsOld;
  } */

  if (fieldsToUpdate.tags !== undefined) {
    photoToEdit.tags = fieldsToUpdate.tags as any;
  }

  if (fieldsToUpdate.description !== undefined) {
    photoToEdit.description = fieldsToUpdate.description;
  }

  if (fieldsToUpdate.date !== undefined) {
    const seconds = Math.round(fieldsToUpdate.date.getTime() / 1000);

    photoToEdit.date = {
      seconds,
      nanoseconds: 0,
      toDate: () => new Date(seconds * 1000),
    };
  }

  newPhotos.unshift(photoToEdit as any);

  newPhotosIndex++;

  return new Promise((res, rej) => {
    setTimeout(() => {
      res(true);
    }, 2000);
  });
};

export const getOne = async (id: string): Promise<Photo<FirestoreDate>> => {
  //let resPhoto;

  // if photo exists - it means we make update on it
  let photo;

  photo = newPhotos.find((photoElem) => photoElem.id === id);

  if (photo === undefined) {
    photo = photos.find((photoElem) => photoElem.id === id);
  }

  console.log("--------------GET ONE ", id, newPhotos, photo);

  //resPhoto = photo === undefined ? addedPhoto : photo;

  return new Promise((res, rej) => {
    setTimeout(() => {
      res(photo as any);
    }, 2000);
  });
};
