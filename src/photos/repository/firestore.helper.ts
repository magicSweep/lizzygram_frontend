import {
  limit,
  QueryConstraint,
  where,
  startAt,
  orderBy,
} from "firebase/firestore";
import { compose, elif, justReturn, tap } from "fmagic";
import { SearchTerms } from "./../../search/types";
import { OrderBy } from "../../firebase/types";

export const makeQueryConstraints_ =
  (
    //numberOfPhotosPerQuery: number,
    where_: typeof where,
    limit_: typeof limit,
    startAt_: typeof startAt,
    orderBy_: typeof orderBy
  ) =>
  (searchTerms: SearchTerms, startAt: any, limit: number, orderBy?: OrderBy) =>
    compose<unknown, QueryConstraint[]>(
      /* tap(() =>
        console.log("=============makeQueryConstraints", searchTerms, startAt)
      ), */
      //add age where
      elif(
        () => searchTerms.age >= 0,
        () => [where_("yearsOld", "==", searchTerms.age)],
        () => []
      ),

      //add tags where
      elif(
        () => searchTerms.tags !== undefined,
        (wheres: any[]) =>
          compose(
            () =>
              Object.keys(searchTerms.tags).map((tagId) => {
                if (searchTerms.tags[tagId] === true)
                  return where_(`tags.${tagId}`, "==", true);
              }),
            (tagsWhere: any[]) =>
              tagsWhere.filter((where) => where !== undefined),
            (tagsWhere: any[]) => wheres.concat(tagsWhere)
          )(),
        justReturn
      ),

      elif(
        () => orderBy !== undefined,
        (wheres: any[]) => wheres.concat([orderBy_(...orderBy)]),
        justReturn
      ),

      //add start at
      elif(
        () => startAt !== undefined && startAt !== null,
        (wheres: any[]) => wheres.concat([startAt_(startAt)]),
        justReturn
      ),

      (wheres: any[]) => wheres.concat([limit_(limit + 1)])
    )();

export const makeQueryConstraints = makeQueryConstraints_(
  //numberOfPhotosPerQuery,
  where,
  limit,
  startAt,
  orderBy
);

export const addIsActiveCondition_ =
  (where_: typeof where) => (wheres: any[]) => {
    //where_(`tags.${tagId}`, "==", true);
    return wheres.concat([where_(`isActive`, "==", true)]);
  };

export const addIsActiveCondition = addIsActiveCondition_(where);

/* export let prevSearchTerms: SearchTerms;

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

  if (!isEqualTags(prevTerms.tags, terms.tags)) return false;

  return true;
};

export const isNeedNewRequest = (
  searchTerms: SearchTerms,
  photoStateLoading: boolean
) => {
  const isNeed =
    (prevSearchTerms === undefined ||
      !isEqualSearchTerms(prevSearchTerms, searchTerms)) &&
    photoStateLoading !== true;

  prevSearchTerms = searchTerms;

  return isNeed;
}; */

/* export const isInitState = (init: any, curr: any) => {
  for (let prop in init) {
    if (init[prop] !== curr[prop]) return false;
  }

  return true;
}; */

/* export const sendRequest_ =
  (
    photosCollectionName: string,
    getFirestore_: typeof getFirestore,
    getDocs_: typeof getDocs,
    query_: typeof query,
    collection_: typeof collection
  ) =>
  (constraints: QueryConstraint[]) =>
    compose<unknown, Promise<QuerySnapshot>>(
      () => getFirestore_(),
      tap(() => console.log("====GET DB", constraints)),
      (db: Firestore) =>
        getDocs_(query_(collection_(db, photosCollectionName), ...constraints))
    )();

export const sendRequest = sendRequest_(
  photosCollectionName,
  getFirestore,
  getDocs,
  query,
  collection
); */

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
  }; */

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
  };

export const makeGetAllPhotosResData = makeGetAllPhotosResData_(
  numberOfPhotosPerQuery
); */

/* import { FirestoreTagsData } from "./../../tags/types";
//import firebase from "firebase/app";
import { Query, QuerySnapshot } from "firebase/firestore";
import {
  tagsCollectionName,
  photosCollectionName,
  numberOfPhotosPerQuery,
} from "../../config";
import { Photo, GetAllPhotosResData, FirestoreDate } from "../types";
import { SearchTerms } from "./../../search/types";

import { isSameArrayValues } from "./../../utils/other";

export let prevSearchTerms: SearchTerms;



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

export const isEqualSearchState = (
  prevTerms: SearchTerms,
  terms: SearchTerms
) => {
  if (prevTerms.yearsOld !== terms.yearsOld) return false;

  if (!isEqualTags(prevTerms.tags, terms.tags)) return false;

  return true;
};

export const isInitState = (init: any, curr: any) => {
  for (let prop in init) {
    if (init[prop] !== curr[prop]) return false;
  }

  return true;
};

export const makeGetAllPhotosResData = (numberOfPhotosPerQuery: number) => (
  querySnapshot: QuerySnapshot
) => {
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

export const sendRequest = async (query: Query) =>
  query.get();

export const addTagsTerms = (tags: FirestoreTagsData) => (
  query: Query
) => {
  for (let tagId in tags) {
    if (tags[tagId] === true) query.where(`tags.${tagId}`, "==", true);
  }
  return query;
};

export const addYearsOldTerms = (yearsOld: number) => (
  query: Query
) => (yearsOld >= 0 ? query.where("yearsOld", "==", yearsOld * 1) : query);

export const addStartAt = (nextPageDocRef?: any) => (
  query: Query
) => (nextPageDocRef ? query.startAt(nextPageDocRef) : query);

export const addOrderBy = (query: Query) =>
  query.orderBy("_timestamp", "desc");

export const addLimit = (numberOfPhotosPerQuery: number) => (
  query: Query
) => query.limit(numberOfPhotosPerQuery + 1);

export const createQuery = () =>
  firebase.firestore().collection(photosCollectionName);

export const withCond = (cond: any, func: any) => (arg: any) =>
  cond ? func(arg) : arg;
 */
