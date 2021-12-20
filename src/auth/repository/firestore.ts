//import firebase from "firebase/app";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import { usersCollectionName } from "../../config";

export const isUserExists = async (userUid: string) => {
  const db = getFirestore();

  const userRef = doc(db, usersCollectionName, userUid);

  const userSnap = await getDoc(userRef);

  return userSnap.exists();
};

/* import firebase from "firebase/app";
import "firebase/firebase-firestore";
import { usersCollectionName } from "../../config";

export const isUserExists = async (userUid: string) => {
  const res = await firebase
    .firestore()
    .collection(usersCollectionName)
    .doc(userUid)
    .get();

  return res.exists;
}; */
