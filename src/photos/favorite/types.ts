import { Action } from "redux";

export type PhotoId = string;

export type FavoriteReqs = PhotoId[];

export type FavoriteState = {
  favoriteReqs: FavoriteReqs;
};

export type FavoriteActionTypes =
  | "FAVORITE_REQUEST_START"
  //| "FAVORITE_REQUEST_END"
  | "FAVORITE_REQUEST_SUCCESS"
  | "FAVORITE_REQUEST_ERROR";

export interface FavoriteAction extends Action<any> {
  type: FavoriteActionTypes;
  photoId?: string;
  userUid?: string;
}
