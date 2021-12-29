/* import {
  doc,
  setDoc,
  getDoc,
  updateDoc,
  getFirestore,
} from "firebase/firestore"; */
import {
  getAllWithCursor,
  addOne as addOne_,
  editOne as editOne_,
  getOne as getOne_,
} from "../../firebase/firestore";
import { photosCollectionName } from "../../config";
import { compose, tap, then } from "fmagic";
import { Photo, FirestoreDate } from "lizzygram-common-data/dist/types";
import {
  // isInitState,
  makeQueryConstraints,
  addIsActiveCondition,
  //sendRequest,
  //addTagsTerms,
  //createQuery,
  //withCond,
  //addLimit,
  //addOrderBy,
  //addStartAt,
  //addYearsOldTerms,
  //makeGetAllPhotosResData,
  //sendRequest,
} from "./firestore.helper";
import { SearchTerms } from "./../../search/types";
import { OrderBy, ResponseWithCursor } from "../../firebase/types";
import {
  DocumentData,
  QueryConstraint,
  QuerySnapshot,
} from "firebase/firestore";

/* export const makeReq = (
  _isInitState: boolean,
  searchTerms: SearchTerms,
  nextPageDocRef?: any
) =>
  compose<unknown, Promise<GetAllPhotosResData>>(
    makeQueryConstraints(searchTerms, nextPageDocRef),
    tap(() => console.log("--------BEFORE SEND REQUEST")),
    sendRequest,
    then(tap(() => console.log("--------AFTER SEND REQUEST"))),
    then(makeGetAllPhotosResData)
  ); */

/* export const getAllBySearchTerms = (
  searchTerms: SearchTerms,
  initSearchTerms: SearchTerms,
  nextPageDocRef?: any
): Promise<GetAllPhotosResData> => {
  //const query = firebase.firestore().collection(photosCollectionName);

  const _isInitState = isInitState(initSearchTerms, searchTerms);

  //Box.of("hello").map((cond, tagsIds) => cond ? )

  // prepare query
  return makeReq(_isInitState, searchTerms, nextPageDocRef)();
}; */

// orderBy: [fieldName, desc]
export const getAllBySearchTerms = async (
  searchTerms: SearchTerms,
  startAt: any,
  limit: number,
  orderBy?: OrderBy
) =>
  compose<unknown, Promise<ResponseWithCursor<Photo<FirestoreDate>>>>(
    () => makeQueryConstraints(searchTerms, startAt, limit, orderBy),
    addIsActiveCondition,
    getAllWithCursor(photosCollectionName, limit)
  )();

export const addOne = addOne_(photosCollectionName);

export const editOne = editOne_(photosCollectionName);

export const getOne: (photoId: string) => Promise<Photo<FirestoreDate>> =
  getOne_(photosCollectionName);

/* export const addOne = (photo: Photo<Date>) => {
  const db = getFirestore();

  return setDoc(doc(db, photosCollectionName, photo.id), photo);
};

export const editOne = (data: EditPhotoFirestoreRequestBody) => {
  const db = getFirestore();

  const photoRef = doc(db, photosCollectionName, data.photoId);

  return updateDoc(photoRef, data.fieldsToUpdate);
};

export const getById = async (
  photoId: string
): Promise<Photo<FirestoreDate>> => {
  const db = getFirestore();

  const photoRef = doc(db, photosCollectionName, photoId);

  const res = await getDoc(photoRef);

  return {
    ...res.data(),
    id: res.id,
  } as Photo<FirestoreDate>;
}; */

/*
export interface PhotosRepository {
  getAll: () => Promise<any[]>;
}

export type WhereOpt = {
  field: string;
  filterOpt: "<" | "<=" | "==" | ">" | ">=";
  value: any;
};

export interface IReqOptions {
  orderBy?: {
    field: string;
    direction: "desc" | "asc";
  };
  limit?: number;
  where?: WhereOpt[];
  startAt?: any;

  //concat: (opt: IReqOptions) => IReqOptions;
}

 class ReqOptions implements IReqOptions {
  orderBy?: {
    field: string;
    direction: "desc" | "asc";
  };
  limit?: number;
  where?: WhereOpt[];
  startAt?: any;

  concat = (opt: IReqOptions) => {
    Object.keys(opt).forEach((key) => {
      if (key !== "concat") {
        if (key === "where" && this.where !== undefined) {
          this.where = this.where.concat(opt.where as WhereOpt[]);
        } else {
          this[key] = opt[key];
        }
      }
    });

    return this;
  };
}

const makeTagsOpts = (tagsIds: string[]) =>
  {
      const conf = new ReqOptions();

      conf.where = tagsIds.map((tagId) => ({
        field: `tags.${tagId}`,
        filterOpt: "==",
        value: true,
      }));

      return conf;
  };

export class MakeReqOpt {
  _value: any; // validate function (key, val) => Fail | Success

  get run() {
    return this._value;
  }

  constructor(value: any) {
    this._value = value;
  }

  static of = (value: any) => new MakeReqOpt(value);

  // other - Validation
  concat = (other: any) =>
    MakeReqOpt.of((key: any, x: any) =>
      this._value(key, x).concat(other._value(key, x))
    );
}

const makeReqOpts = (searchState: ISearchState) => {
  
};
 */
/* class PhotosFirestoreRepository implements PhotosRepository {
  db: firebase.firestore.Firestore;
  //photosCollectionName: string;
  //tagsCollectionName: string;

  constructor(db: firebase.firestore.Firestore) {
    this.db = db;
  }

  getAll = async () => {
    const querySnapshot = await this.query
      //.where("isActive", "==", true)
      .limit(this.numberOfPhotosPerQuery + 1)
      .get();

    return [];
  };

  loadMore = async () => {};
}

export default PhotosFirestoreRepository; /

// .where("isActive", "==", true) and limit
//export const getAll = () => {};
 */
