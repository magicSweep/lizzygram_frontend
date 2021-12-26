//import { collection, getDocs, getFirestore } from "firebase/firestore";
import { getAll as getAll_ } from "../../firebase/firestore";
import { tagsCollectionName } from "../../config";
import { TagData } from "../../tags/types";

export const getAll: () => Promise<TagData[]> = getAll_(tagsCollectionName);

/* export const getAll = async () => {
  const tags: TagData[] = [];

  const db = getFirestore();

  const snap = await getDocs(collection(db, tagsCollectionName));

  snap.forEach((tag) => {
    //tags.set(tag.id, tag.data() as any);
    tags.push({ id: tag.id, ...(tag.data() as TagCheckbox) });
  });

  return tags;
}; */
