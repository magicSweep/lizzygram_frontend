/*import  IPhotosAction, IPhotosState, TPhotosData  "../../types";*/
import { AddEditPhotoState, AddEditPhotoAction } from "./../../types";

export const onAddPhotoError = (
  state: AddEditPhotoState,
  action: AddEditPhotoAction
): AddEditPhotoState => {
  return {
    ...state,
    addReqs: {
      ...state.addReqs,
      numberOfActiveReqs: state.addReqs.numberOfActiveReqs - 1,
    },
  };
};

//onAddPhoto
export const onAddPhotoSuccess = (
  state: AddEditPhotoState,
  action: AddEditPhotoAction
): AddEditPhotoState => {
  return {
    ...state,
    addReqs: {
      ...state.addReqs,
      numberOfActiveReqs: state.addReqs.numberOfActiveReqs - 1,
    },
  };
};

export const onEditPhotoError = (
  state: AddEditPhotoState,
  action: AddEditPhotoAction
): AddEditPhotoState => {
  //console.log("-------------onEditPhotoError", action);
  return {
    ...state,
    editReqs: {
      ...state.editReqs,
      activeReqIds: state.editReqs.activeReqIds.filter(
        (id) => id !== action.photoId
      ),
    },
  };
};

//GET_ADDED_PHOTO_SUCCESS
export const onEditPhotoSuccess = (
  state: AddEditPhotoState,
  action: AddEditPhotoAction
): AddEditPhotoState => {
  //console.log("-------------onEditPhotoSuccess", action);
  /*  if (typeof action.photoOrId === "string") {
    // IF WE HAVE PHOTO_ID IT MEANS THAT EDITED PHOTO
    // NOT IN SEARCH TERMS
    return {
      ...state,
      editReqs: {
        ...state.editReqs,
        activeReqIds: state.editReqs.activeReqIds.filter(
          (id) => id !== (action.photoOrId as string)
        ),
      },
      photos: (state.photos as Photo<FirestoreDate>[]).filter(
        (photo) => photo.id !== action.photoOrId
      ),
    };
  } else { */
  return {
    ...state,
    editReqs: {
      ...state.editReqs,
      activeReqIds: state.editReqs.activeReqIds.filter(
        (id) => id !== action.photoId
      ),
    },
  };
};
