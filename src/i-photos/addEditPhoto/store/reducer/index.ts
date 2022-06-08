import { Reducer } from "redux";
import { makePhotoId } from "../../../../utils/app";
import { AddEditPhotoState, AddEditPhotoAction } from "../../types";
import {
  onAddPhotoError,
  onAddPhotoSuccess,
  onEditPhotoError,
  onEditPhotoSuccess,
} from "./helper";

const photosInitialState: AddEditPhotoState = {
  addReqs: {
    numberOfActiveReqs: 0,
    reqIds: [],
  },
  editReqs: {
    activeReqIds: [],
    reqIds: [],
  },
};

const reducer: Reducer<AddEditPhotoState, AddEditPhotoAction> = (
  state = photosInitialState,
  action: AddEditPhotoAction
) => {
  switch (action.type) {
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

    case "ADD_PHOTO_REQUEST_SUCCESS":
      return onAddPhotoSuccess(state, action);

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

    default:
      return state;
  }
};

export default reducer;
