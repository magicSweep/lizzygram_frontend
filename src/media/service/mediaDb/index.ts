import {
  editOne as editOne_,
  addOne as addOne_,
} from "../../../service/firestore";
import { Photo } from "lizzygram-common-data/dist/types";
import { photosCollectionName } from "../../../config";

const editOne = editOne_(photosCollectionName);

const addOne = addOne_(photosCollectionName);

export const addMedia = async (photo) => {
  return addOne(photo) as any;
};

export const editMedia = async (dataToEdit) => {
  return editOne(dataToEdit);
};

export const changeFavorites = (data: {
  photoId: string;
  fieldsToUpdate: {
    favoriteBy: Photo<any>["favoriteBy"];
  };
}) => {
  //
  return editOne(data);
};
