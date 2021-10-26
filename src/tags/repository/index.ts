import { collection, getDocs, getFirestore } from "firebase/firestore";
import { tagsCollectionName } from "../../config";
import { TagData, TagCheckbox } from "../../tags/types";

/*  const db = getFirestore();

  const userRef = doc(db, usersCollectionName, userUid);

  const userSnap = await getDoc(userRef); */

export const getAll = async () => {
  const tags: TagData[] = [];

  const db = getFirestore();

  const snap = await getDocs(collection(db, tagsCollectionName));

  snap.forEach((tag) => {
    //tags.set(tag.id, tag.data() as any);
    tags.push({ id: tag.id, ...(tag.data() as TagCheckbox) });
  });

  return tags;
};

/* export interface TagsRepository {
  getAll: () => Promise<TagData[]>;
}

class TagsFirestoreRepository implements TagsRepository {
  db: firebase.firestore.Firestore;
  //photosCollectionName: string;
  //tagsCollectionName: string;

  constructor(db: firebase.firestore.Firestore) {
    this.db = db;
  }

  getAll = async () => {
    const tags: TagData[] = [];

    const snap = await this.db.collection(tagsCollectionName).get();

    snap.forEach((tag: any) => {
      //tags.set(tag.id, tag.data() as any);
      tags.push({ id: tag.id, ...tag.data() });
    });

    return tags;
  };
}

export default TagsFirestoreRepository; */
