import { SearchTerms } from "./../../../../search/types";
import { FirestoreTagsData } from "./../../../../tags/types";
import { Photo, FirestoreDate } from "lizzygram-common-data/dist/types";
import { ResponseWithCursor } from "../../../../firebase/types";
//import { numberOfPhotosPerQuery, photosCollectionName } from "./../../../config";
//import { FirestoreDate, GetAllPhotosResData, Photo } from "../../types";
// import { OrderBy } from "../../firebase/types";

export let prevSearchTerms: SearchTerms;

export const setPrevSearchTerms = (prevSearchTerms_: SearchTerms) =>
  (prevSearchTerms = prevSearchTerms_);
export const getPrevSearchTerms = () => prevSearchTerms;

export const isEqualTags = (
  tags1?: FirestoreTagsData,
  tags2?: FirestoreTagsData
) => {
  if (tags1 === undefined || tags2 === undefined) {
    if (tags1 === undefined && tags2 === undefined) return true;
    else return false;
  }

  for (let tagId in tags1) {
    if (tags1[tagId] !== (tags2 as FirestoreTagsData)[tagId]) return false;
  }

  return true;
};

export const isEqualSearchTerms = (
  prevTerms: SearchTerms,
  terms: SearchTerms
) => {
  if (prevTerms.age !== terms.age) return false;

  if (prevTerms.mine !== terms.mine) return false;

  if (prevTerms.favorites !== terms.favorites) return false;

  if (!isEqualTags(prevTerms.tags, terms.tags)) return false;

  return true;
};

export const isNeedNewRequest_ =
  (
    setPrevSearchTerms: (prevSearchTerms_: SearchTerms) => void,
    getPrevSearchTerms: () => SearchTerms
  ) =>
  (searchTerms: SearchTerms, photoStateLoading: boolean) => {
    let prevSearchTerms = getPrevSearchTerms();

    const isNeed =
      (prevSearchTerms === undefined ||
        !isEqualSearchTerms(prevSearchTerms, searchTerms)) &&
      photoStateLoading !== true;

    setPrevSearchTerms(searchTerms);

    return isNeed;
  };

export const isNeedNewRequest = isNeedNewRequest_(
  setPrevSearchTerms,
  getPrevSearchTerms
);

export const makeGetAllPhotosResData = (
  resData: ResponseWithCursor<Photo<FirestoreDate>>
) => ({
  hasNextPage: resData.cursor !== undefined,
  nextPageDocRef: resData.cursor,
  photos: resData.docs,
});

/* export const makeGetAllPhotosResData_ =
  (numberOfPhotosPerQuery: number) => (querySnapshot: QuerySnapshot) => {
    //console.log("-------------------makeGetAllPhotosResData");

    const res: GetAllPhotosResData = {
      hasNextPage: false,
      nextPageDocRef: null,
      photos: [],
    };

    let count = 0;

    querySnapshot.forEach((photo) => {
      if (count >= numberOfPhotosPerQuery) {
        res.hasNextPage = true;
        res.nextPageDocRef = photo;
      } else {
        const photoData = photo.data();
        if (photoData.isActive === true)
          res.photos.push({
            id: photo.id,
            ...photoData,
          } as Photo<FirestoreDate>);
        count++;
      }
    });

    return res;
  };
 */
/* export const makeGetAllPhotosResData_ =
  (numberOfPhotosPerQuery: number) => (photos: Photo<FirestoreDate>[]) => {
    //console.log("-------------------makeGetAllPhotosResData");

    const res: GetAllPhotosResData = {
      hasNextPage: false,
      nextPageDocRef: null,
      photos: [],
    };

    if (photos.length > numberOfPhotosPerQuery) {
      res.hasNextPage = true;
      res.nextPageDocRef = photos.pop();
    }

    res.photos = photos;

    return res;
  }; */

/* export const makeGetAllPhotosResData = makeGetAllPhotosResData_(
  numberOfPhotosPerQuery
); */
