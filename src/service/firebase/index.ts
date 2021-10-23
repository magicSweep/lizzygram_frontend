import { getFirestore, Firestore as IFirestore } from "firebase/firestore";
//import { firebaseConfig } from "../../config";

//CONFIG FIREBASE

/* export const initApp = () => {
  if (typeof window !== "undefined" && firebase.apps && !firebase.apps.length)
    firebase.initializeApp(firebaseConfig);
}; */

export class Firestore {
  protected static _instance: Firestore;

  db: IFirestore;
  //photosCollectionName: string;
  //tagsCollectionName: string;

  private constructor() {
    this.db = getFirestore();
  }

  static getInstance = () => {
    if (Firestore._instance) return Firestore._instance;

    Firestore._instance = new Firestore();

    return Firestore._instance;
  };
}
