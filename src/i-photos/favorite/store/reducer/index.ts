import { Reducer } from "redux";
import { FavoriteAction, FavoriteState } from "../../types";

//import { onFetchMorePhotosRequestSuccess } from "./helper";
import {
  deleteFromFavoriteReqs,
  //updateFavoriteByOnPhotos,
} from "./favoriteReducer.helper";

const photosInitialState: FavoriteState = {
  favoriteReqs: [],
};

const reducer: Reducer<FavoriteState, FavoriteAction> = (
  state = photosInitialState,
  action: FavoriteAction
) => {
  switch (action.type) {
    case "FAVORITE_REQUEST_START":
      return {
        ...state,
        favoriteReqs: [
          ...state.favoriteReqs,
          action.photoId,
          /* {
            photoId: action.photoId,
            loading: true,
          }, */
        ],
      };

    case "FAVORITE_REQUEST_ERROR":
      return {
        ...state,
        favoriteReqs: deleteFromFavoriteReqs(
          state.favoriteReqs,
          action.photoId
        ),
      };

    case "FAVORITE_REQUEST_SUCCESS":
      // update favoriteBy on photo and photos
      return {
        ...state,
        /*  photos: updateFavoriteByOnPhotos(
          state.photos,
          action.photoId,
          action.userUid
        ), */
        favoriteReqs: deleteFromFavoriteReqs(
          state.favoriteReqs,
          action.photoId
        ),
      };

    /* case "EDIT_PHOTO_REQUEST_SUCCESS":
      return onEditPhotoRequestSuccess(state, action);

     */

    /*  case "DELETE_PHOTO":
      return onDeletePhoto(state, action); */

    /*  case "REMOVE_PHOTO_REQUEST_INFO":
      return onRemovePhotoRequestInfo(state, action); */

    default:
      return state;
  }
};

export default reducer;
