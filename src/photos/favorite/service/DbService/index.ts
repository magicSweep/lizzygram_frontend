import { editOne as editOne_ } from "../../../../../../service/firebase/firestore";
import { Photo } from "lizzygram-common-data/dist/types";
import { photosCollectionName } from "../../../../../../config";

const editOne = editOne_(photosCollectionName);

export const changeFavorites = (data: {
  photoId: string;
  fieldsToUpdate: {
    favoriteBy: Photo<any>["favoriteBy"];
  };
}) => {
  //
  return editOne(data);
};
