//import { collection, getDocs, getFirestore } from "firebase/firestore";
import { getAll as getAll_ } from "../../../i-service/firebase/firestore";
import { tagsCollectionName } from "../../../config";
import { TagData } from "../../../tags/types";

const getAllTags = getAll_(tagsCollectionName);

export const getAll: () => Promise<TagData[]> = async () => {
  const result = await getAllTags();

  return result.docs;
};
