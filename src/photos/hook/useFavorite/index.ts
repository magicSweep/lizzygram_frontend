import { FavoriteData } from "lizzygram-common-data/dist/types";
import { Dispatch } from "react";
import { batch, useDispatch, useSelector } from "react-redux";
import { GlobalState } from "../../../types";
import { changeFavorites as changeFavorites_ } from "../../service/DbService";
import {
  favoritePhotoStartRequestAC,
  favoritePhotoEndRequestAC,
  favoritePhotoErrorRequestAC,
} from "../../store/action";
import { FavoriteReqs } from "../../types";
import { showAlertAC } from "./../../../alert";

export type AddToFavorite = (
  photoId: string,
  favoriteBy: FavoriteData
) => Promise<void>;
export type RemoveFromFavorite = (
  photoId: string,
  favoriteBy: FavoriteData
) => Promise<void>;

export const add__ =
  (changeFavorites: typeof changeFavorites_) =>
  (dispatch: Dispatch<any>, userUid: string) =>
  async (photoId: string, favoriteBy: FavoriteData) => {
    try {
      dispatch(favoritePhotoStartRequestAC(photoId));

      await changeFavorites({
        photoId,
        fieldsToUpdate: {
          favoriteBy: {
            ...favoriteBy,
            [userUid]: true,
          },
        },
      });
    } catch (err) {
      // show error alert
      batch(() => {
        dispatch(favoritePhotoErrorRequestAC(photoId));
        dispatch(
          showAlertAC("Упс. Мы не смогли добавить фото в избранное...", "error")
        );
      });
    } finally {
      dispatch(favoritePhotoEndRequestAC(photoId, userUid));
    }
  };

export const remove__ =
  (changeFavorites: typeof changeFavorites_) =>
  (dispatch: Dispatch<any>, userUid: string) =>
  async (photoId: string, favoriteBy: FavoriteData) => {
    try {
      dispatch(favoritePhotoStartRequestAC(photoId));

      const newFavoriteBy = {};

      for (let prop in favoriteBy) {
        if (prop !== userUid) newFavoriteBy[prop] = favoriteBy[prop];
      }

      await changeFavorites({
        photoId,
        fieldsToUpdate: { favoriteBy: newFavoriteBy },
      });
    } catch (err) {
      batch(() => {
        dispatch(favoritePhotoErrorRequestAC(photoId));
        dispatch(
          showAlertAC(
            "Упс. Мы не смогли удалить фото из избранного...",
            "error"
          )
        );
      });
    } finally {
      dispatch(favoritePhotoEndRequestAC(photoId, userUid));
    }
  };

const add_ = add__(changeFavorites_);
const remove_ = remove__(changeFavorites_);

export const useFavorite = (userUid: string) => {
  const dispatch = useDispatch();

  const favoriteReqs = useSelector<GlobalState, FavoriteReqs>(
    (state) => state.photos.favoriteReqs
  );

  const add = add_(dispatch, userUid);

  const remove = remove_(dispatch, userUid);

  return {
    add,
    remove,
    favoriteReqs,
  };
};
