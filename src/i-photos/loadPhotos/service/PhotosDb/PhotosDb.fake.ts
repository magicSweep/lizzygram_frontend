//import { EditPhotoFirestoreRequestBody } from "../types";
import { Photo, FirestoreDate } from "lizzygram-common-data/dist/types";
import { SearchTerms } from "./../../../../search/types";
import { photos as photosToAdd } from "../../fake-data/fake.data";
import { photos as initPhotos } from "../../fake-data/photos.db";
//import { OrderBy } from "../../firebase/types";
import { numberOfPhotosPerQuery } from "../../../../config";
import wait from "waait";
import { ResponseWithCursor } from "../../../../i-service/firebase/types";

//import { isInitState } from "./helper";

const getPhotos = (length: number = 0) => {
  if (length === 0) return initPhotos;

  const photos: any[] = [];

  let y = 0;

  for (let i = 0; i < length; i++) {
    if (y === initPhotos.length) {
      y = 0;
    }

    photos.push(initPhotos[y]);

    y++;
  }

  return photos;
};

const photos = getPhotos(15);

const isNeedSearch = (searchTerms: SearchTerms) => {
  return !(searchTerms.age === -1 && searchTerms.tags === undefined);
};

export const searchPhotoFilter =
  (searchTerms: SearchTerms, userUid: string) => (photo: any) => {
    if (searchTerms.age !== -1 && searchTerms.age !== photo.yearsOld) {
      return false;
    }

    if (searchTerms.tags !== undefined) {
      for (let tagId in searchTerms.tags) {
        if (searchTerms.tags[tagId] === true && photo.tags[tagId] !== true)
          return false;
      }
    }

    if (searchTerms.mine !== false && photo.addedByUserUID !== userUid)
      return false;

    if (searchTerms.favorites !== false && photo.favoriteBy === undefined)
      return false;

    if (searchTerms.favorites !== false && photo.favoriteBy[userUid] !== true)
      return false;

    return true;
  };

export const getAllPhotos = async (
  userUid: string,
  searchTerms: SearchTerms,
  nextPageDocRef?: any
): Promise<ResponseWithCursor<any>> => {
  let fPhotos: any[] = [];

  console.log(
    "------------IS NEED SEARCH",
    isNeedSearch(searchTerms),
    searchTerms
  );
  // FIRST WE MAKE PHOTOS WITH SEARCH CONDITIONS OR NOT
  if (isNeedSearch(searchTerms)) {
    fPhotos = photos.filter(searchPhotoFilter(searchTerms, userUid));
  } else {
    fPhotos = photos;
  }

  // SECOND WE MAKE RESULT
  let resPhotos: Photo<FirestoreDate>[] = [];
  let ourNextPageDocRef: any = undefined;

  if (nextPageDocRef !== undefined) {
    // LOAD MORE PHOTOS
    const nextIndex = fPhotos.findIndex(
      (photo) => photo.id === nextPageDocRef.id
    );

    resPhotos = fPhotos.slice(
      nextIndex,
      nextIndex + numberOfPhotosPerQuery
    ) as any;

    ourNextPageDocRef = fPhotos[nextIndex + numberOfPhotosPerQuery];
  } else {
    // LOAD PHOTOS
    resPhotos = fPhotos.slice(0, numberOfPhotosPerQuery) as any;

    ourNextPageDocRef = fPhotos[numberOfPhotosPerQuery];
  }

  await wait(2000);

  return {
    docs: resPhotos as any[],
    cursor: ourNextPageDocRef,
  };
};

/* export const getAllBySearchTerms = async (
  userUid: string,
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
    fPhotos = photos.filter(searchPhotoFilter(searchTerms, userUid));
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
      }); /
    }, 2000);
  });
};
 */
/* export const init = () => {};

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

  if (fieldsToUpdate.favoriteBy !== undefined) {
    (photoToEdit as any).favoriteBy = fieldsToUpdate.favoriteBy;
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
 */
