//import firebase from "firebase/app";
import {
  query,
  doc,
  getDoc,
  getDocs,
  setDoc,
  addDoc,
  updateDoc,
  collection,
  getFirestore,
  QueryConstraint,
  QuerySnapshot,
  DocumentData,
  deleteDoc,
  OrderByDirection,
} from "firebase/firestore";
//import { compose } from "redux";
import { ResponseWithCursor, OrderBy, Constraint } from "./types";
import { makeQueryConstraints } from "./firestore.helper";

export const getAll =
  (collectionName: string) =>
  async (
    //userUid: string,
    // constraint: [name, "===", value]
    constraints?: Constraint[],
    startAt?: any,
    limit?: number,
    orderBy?: OrderBy
  ): Promise<ResponseWithCursor<any>> => {
    const queryConstraints = makeQueryConstraints(
      constraints,
      startAt,
      limit,
      orderBy
    );

    return getAllWithCursor(collectionName, limit)(queryConstraints);
  };
/*  compose<unknown, Promise<ResponseWithCursor<Photo<FirestoreDate>>>>(
    () => makeQueryConstraints(userUid, constraints, startAt, limit, orderBy),
    addIsActiveCondition,
    getAllWithCursor(photosCollectionName, limit)
  )(); */

export const getAllWithCursor =
  (collectionName: string, limit?: number) =>
  async (constraints: QueryConstraint[]): Promise<ResponseWithCursor<any>> => {
    const result: ResponseWithCursor<any> = {
      docs: [],
      cursor: undefined,
    };

    //console.log("------------GET ALL START", constraints);

    const db = getFirestore();

    const querySnapshot = await getDocs(
      query(collection(db, collectionName), ...constraints)
    );

    const resLength = querySnapshot.docs.length;

    result.docs = querySnapshot.docs.map((doc) => {
      return { id: doc.id, ...(doc.data() as any) };
    });

    if (limit !== undefined && resLength === limit + 1) {
      result.cursor = querySnapshot.docs[resLength - 1];

      result.docs.pop();
    }
    /* querySnapshot.forEach((doc) => {
      //tags.set(tag.id, tag.data() as any);
      result.docs.push({ id: doc.id, ...(doc.data() as any) });
    }); */

    //console.log("------------GET ALL", docs);

    return result;
  };

/* export const getAllSnapshot =
  (collectionName: string) => async (constraints: QueryConstraint[]) => {
    const docs: any[] = [];

    //console.log("------------GET ALL START", constraints);

    const db = getFirestore();

    return getDocs(query(collection(db, collectionName), ...constraints));
  }; */

/* export const getAll =
  (collectionName: string) => async (constraints?: QueryConstraint[]) => {
    const docs: any[] = [];

    //console.log("------------GET ALL START", constraints);

    const db = getFirestore();

    let snap: QuerySnapshot<DocumentData>;

    if (constraints === undefined)
      snap = await getDocs(collection(db, collectionName));
    else
      snap = await getDocs(
        query(collection(db, collectionName), ...constraints)
      );

    snap.forEach((doc) => {
      //tags.set(tag.id, tag.data() as any);
      docs.push({ id: doc.id, ...(doc.data() as any) });
    });

    //console.log("------------GET ALL", docs);

    return docs;
  }; */

export const addOne = (collectionName: string) => (data: any) => {
  const db = getFirestore();

  if (data.id === undefined) {
    return addDoc(collection(db, collectionName), data);
  }

  return setDoc(doc(db, collectionName, data.id), data);
};

export const editOne = (collectionName: string) => (data: any) => {
  const db = getFirestore();

  const photoRef = doc(db, collectionName, data.photoId);

  return updateDoc(photoRef, data.fieldsToUpdate);
};

export const getOne =
  (collectionName: string) =>
  async (id: string): Promise<any> => {
    const db = getFirestore();

    const docRef = doc(db, collectionName, id);

    const res = await getDoc(docRef);

    return {
      ...res.data(),
      id: res.id,
    };
  };

export const removeOne =
  (collectionName: string) =>
  async (id: string): Promise<void> => {
    const db = getFirestore();

    deleteDoc(doc(db, collectionName, id));
  };

export const isExists = (collectionName: string) => async (docId: string) => {
  const db = getFirestore();

  const docRef = doc(db, collectionName, docId);

  const docSnap = await getDoc(docRef);

  //const docSnap = await getOne(collectionName)(docId);

  return docSnap.exists();
};
