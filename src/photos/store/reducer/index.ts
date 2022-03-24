import { Reducer } from "redux";
import { makePhotoId } from "../../../utils/app";
import { PhotosState, PhotosAction } from "../../types";
import { Photo, FirestoreDate } from "lizzygram-common-data/dist/types";

//import { onFetchMorePhotosRequestSuccess } from "./helper";
import {
  /*  onAddPhotoStartRequest,
  onAddPhotoRequestSuccess,
  onAddPhotoRequestError, */
  onGetAddedPhotoSuccess,
  onAddPhotoError,
  onEditPhotoError,
  onFetchMorePhotosRequestSuccess,
  // onGetAddedPhotoError,
  //onRemovePhotoRequestInfo,
  // onEditPhotoStartRequest,
  //onEditPhotoRequestSuccess,
  // onEditPhotoRequestError,
  // onDeletePhoto,
  onEditPhotoSuccess,
  getPhotoIndexByPhotoId,
  deleteFromFavoriteReqs,
  updateFavoriteByOnPhotos,
  // onGetEditedPhotoError,
} from "./helper";

const photosInitialState: PhotosState = {
  activePhotoIndex: 0,
  showPhotoSlider: false,
  nextPageDocRef: undefined,
  hasNextPage: false,
  photos: undefined,
  loading: false,
  error: false,
  addReqs: {
    numberOfActiveReqs: 0,
    reqIds: [],
  },
  editReqs: {
    activeReqIds: [],
    reqIds: [],
  },
  favoriteReqs: [],
  //editLoading: false,
  //editError: false,
  //editAnotherForm: false,
};

const reducer: Reducer<PhotosState, PhotosAction> = (
  state = photosInitialState,
  action: PhotosAction
) => {
  switch (action.type) {
    case "ALL_PHOTOS_REQUEST_NEW_START":
      return {
        ...state,
        photos: undefined,
        loading: true,
        error: false,
      };
    case "ALL_PHOTOS_REQUEST_MORE_START":
      return {
        ...state,
        loading: true,
        error: false,
      };
    case "ALL_PHOTOS_REQUEST_SUCCESS":
      return {
        ...state,
        photos: action.photos,
        loading: false,
        error: false,
        nextPageDocRef: action.nextPageDocRef,
        hasNextPage: action.hasNextPage === true,
      };

    case "FETCH_MORE_PHOTO_REQUEST_SUCCESS":
      return onFetchMorePhotosRequestSuccess(state, action);

    case "ALL_PHOTOS_REQUEST_ERROR":
      return {
        ...state,
        loading: false,
        error: true,
      };

    case "ADD_PHOTO_REQUEST_START":
      const newPhotoId = makePhotoId();

      return {
        ...state,
        addReqs: {
          ...state.addReqs,
          reqIds: [...state.addReqs.reqIds, newPhotoId],
        },
      };

    case "ADD_PHOTO_REQUEST_SEND":
      return {
        ...state,
        addReqs: {
          ...state.addReqs,
          numberOfActiveReqs: state.addReqs.numberOfActiveReqs + 1,
        },
      };

    case "ADD_PHOTO_REQUEST_ERROR":
      return onAddPhotoError(state, action);

    case "GET_ADDED_PHOTO_REQUEST_SUCCESS":
      return onGetAddedPhotoSuccess(state, action);

    case "GET_ADDED_PHOTO_REQUEST_ERROR":
      return onAddPhotoError(state, action);

    case "ADD_PHOTO_REQUEST_END":
      return {
        ...state,
        addReqs: {
          ...state.addReqs,
          reqIds: state.addReqs.reqIds.filter(
            (v) => v !== (action.photoId as string)
          ),
        },
      };

    /*   case "ADD_PHOTO_REQUEST_SUCCESS":
      return onAddPhotoRequestSuccess(state, action);

     */

    case "EDIT_PHOTO_REQUEST_START":
      return {
        ...state,
        editReqs: {
          ...state.editReqs,
          reqIds: [...state.editReqs.reqIds, action.photoId as string],
        },
      };

    case "EDIT_PHOTO_REQUEST_SEND":
      return {
        ...state,
        editReqs: {
          ...state.editReqs,
          activeReqIds: [
            ...state.editReqs.activeReqIds,
            action.photoId as string,
          ],
        },
      };

    case "EDIT_PHOTO_REQUEST_ERROR":
      return onEditPhotoError(state, action);

    case "EDIT_PHOTO_REQUEST_SUCCESS":
      return onEditPhotoSuccess(state, action);

    case "GET_EDITED_PHOTO_REQUEST_ERROR":
      return onEditPhotoError(state, action);

    case "EDIT_PHOTO_REQUEST_END":
      /* reqIds: state.addReqs.reqIds.filter(
            (v) => v !== (action.photoId as string)
          ), */
      return {
        ...state,
        editReqs: {
          ...state.editReqs,
          reqIds: state.editReqs.reqIds.filter(
            (id) => id !== (action.photoId as string)
          ),
        },
      };

    case "SHOW_PHOTO_SLIDER":
      return {
        ...state,
        showPhotoSlider: true,
        activePhotoIndex: getPhotoIndexByPhotoId(state.photos, action.photoId),
      };

    case "HIDE_PHOTO_SLIDER":
      return {
        ...state,
        showPhotoSlider: false,
      };

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

    case "FAVORITE_REQUEST_END":
      // update favoriteBy on photo and photos
      return {
        ...state,
        photos: updateFavoriteByOnPhotos(
          state.photos,
          action.photoId,
          action.userUid
        ),
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
