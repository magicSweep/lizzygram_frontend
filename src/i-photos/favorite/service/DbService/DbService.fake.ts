import { Photo } from "lizzygram-common-data/dist/types";
import wait from "waait";

export const changeFavorites = async (data: {
  photoId: string;
  fieldsToUpdate: {
    favoriteBy: Photo<any>["favoriteBy"];
  };
}) => {
  //
  await wait(3000);
};
