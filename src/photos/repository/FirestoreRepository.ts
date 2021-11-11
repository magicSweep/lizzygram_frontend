/* import { flow } from "lodash-es";
import { FirestoreTagsData } from "src/tags/types";
import {
  tagsCollectionName,
  photosCollectionName,
  numberOfPhotosPerQuery,
} from "../../config";
import { then } from "../../utils/func_prog";
import {
  IPhoto,
  GetAllPhotosResData,
  FirestoreDate,
  EditPhotoFirestoreData,
} from "../types";
import {
  isInitState,
  addTagsTerms,
  createQuery,
  withCond,
  addLimit,
  addOrderBy,
  addStartAt,
  addYearsOldTerms,
  makeGetAllPhotosResData,
  sendRequest,
} from "./helper";
import { SearchTerms } from "./../../search/types";

export const makeReq = (
  _isInitState: boolean,
  searchTerms: SearchTerms,
  numberOfPhotosPerQuery: number,
  nextPageDocRef?: any
) =>
  flow(
    createQuery,
    // make query with terms
    withCond(
      !_isInitState,
      addTagsTerms(searchTerms.tags as FirestoreTagsData)
    ),
    withCond(!_isInitState, addYearsOldTerms(searchTerms.yearsOld)),
    addStartAt(nextPageDocRef),
    withCond(_isInitState, addOrderBy),
    addLimit(numberOfPhotosPerQuery),
    // send request with query
    sendRequest,
    then(makeGetAllPhotosResData(numberOfPhotosPerQuery))
  );

export const getAllBySearchTerms = (
  searchTerms: SearchTerms,
  numberOfPhotosPerQuery: number,
  initSearchTerms: SearchTerms,
  nextPageDocRef?: any
): Promise<GetAllPhotosResData> => {
  //const query = firebase.firestore().collection(photosCollectionName);

  const _isInitState = isInitState(initSearchTerms, searchTerms);

  //Box.of("hello").map((cond, tagsIds) => cond ? )

  // prepare query
  return makeReq(
    _isInitState,
    searchTerms,
    numberOfPhotosPerQuery,
    nextPageDocRef
  )();
};

export const addOne = (photo: IPhoto<any>) => {
  return createQuery().doc(photo.id).set(photo);
};

export const editOne = (data: EditPhotoFirestoreData) => {
  return createQuery().doc(data.photoId).update(data.fieldsToUpdate);
};

export const getById = async (id: string): Promise<IPhoto<any>> => {
  //const photo = makeAddPhotoData(data.photoFormData);
  //photo.addedByUserUID = data.userUid;

  //SAVE PHOTO DATA TO FIRESTORE
  //const id = (data.photoFormData.date.getTime() + random(69999)).toString();
  const res = await createQuery().doc(id).get();

  /* const photo: IPhoto = {
    id: id,
    ...res.data(),
  }; 

  return photo;/
  return res.data() as IPhoto<FirestoreDate>;
};

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
