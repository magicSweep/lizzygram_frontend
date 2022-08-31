import { FavoriteData, Photo } from "lizzygram-common-data/dist/types";
import { Dispatch } from "react";
import { batch, shallowEqual, useDispatch, useSelector } from "react-redux";
import { GlobalState } from "../../../types";
import { changeFavorites as changeFavorites_ } from "../service/DbService/DbService.fake";
import {
  favoritePhotoStartRequestAC,
  favoritePhotoSuccessRequestAC,
  favoritePhotoErrorRequestAC,
} from "../store";
import { FavoriteReqs } from "../types";
import { showAlertAC } from "./../../../alert";
import { editPhotoAC } from "./../../loadPhotos";

export type AddToFavorite = (
  photoId: string,
  favoriteBy: FavoriteData
) => Promise<void>;
export type RemoveFromFavorite = (
  photoId: string,
  favoriteBy: FavoriteData
) => Promise<void>;

export const add__ =
  (changeFavorites: typeof changeFavorites_, batch_: typeof batch) =>
  (dispatch: Dispatch<any>, userUid: string) =>
  async (photoId: string, favoriteBy?: FavoriteData) => {
    const fieldsToUpdate: { favoriteBy: FavoriteData } = {
      favoriteBy: {
        ...favoriteBy,
        [userUid]: true,
      },
    };

    try {
      dispatch(favoritePhotoStartRequestAC(photoId));

      await changeFavorites({
        photoId,
        fieldsToUpdate /* : {
          favoriteBy: {
            ...favoriteBy,
            [userUid]: true,
          },
        } */,
      });

      batch_(() => {
        dispatch(
          editPhotoAC({
            id: photoId,
            favoriteBy: fieldsToUpdate.favoriteBy,
          } as any)
        );
        dispatch(favoritePhotoSuccessRequestAC(photoId));
      });
    } catch (err) {
      // show error alert
      batch_(() => {
        dispatch(favoritePhotoErrorRequestAC(photoId));
        dispatch(
          showAlertAC({
            message: "Упс. Мы не смогли добавить фото в избранное...",
            alertType: "error",
          })
        );
      });
    }
  };

export const remove__ =
  (changeFavorites: typeof changeFavorites_) =>
  (dispatch: Dispatch<any>, userUid: string) =>
  async (photoId: string, favoriteBy?: FavoriteData) => {
    const newFavoriteBy = {};

    for (let prop in favoriteBy) {
      if (prop !== userUid) newFavoriteBy[prop] = favoriteBy[prop];
    }

    //console.log("NEW FAVORITE", favoriteBy, newFavoriteBy);

    try {
      dispatch(favoritePhotoStartRequestAC(photoId));

      /* const newFavoriteBy = {};

      for (let prop in favoriteBy) {
        if (prop !== userUid) newFavoriteBy[prop] = favoriteBy[prop];
      } */

      await changeFavorites({
        photoId,
        fieldsToUpdate: { favoriteBy: newFavoriteBy },
      });

      batch(() => {
        dispatch(
          editPhotoAC({
            id: photoId,
            favoriteBy: newFavoriteBy,
          } as any)
        );
        dispatch(favoritePhotoSuccessRequestAC(photoId));
      });
    } catch (err) {
      batch(() => {
        dispatch(favoritePhotoErrorRequestAC(photoId));
        dispatch(
          showAlertAC({
            message: "Упс. Мы не смогли удалить фото из избранного...",
            alertType: "error",
          })
        );
      });
    }
  };

const add_ = add__(changeFavorites_, batch);
const remove_ = remove__(changeFavorites_);

export const useFavorite = (userUid: string) => {
  const dispatch = useDispatch();

  const favoriteReqs = useSelector<GlobalState, FavoriteReqs>(
    (state) => state.favorite.favoriteReqs,
    shallowEqual
  );

  const add = add_(dispatch, userUid);

  const remove = remove_(dispatch, userUid);

  return {
    add,
    remove,
    favoriteReqs,
  };
};
