import /* IPhotosAction, IPhotosState, TPhotosData */ "../../types";
import { PhotosState, PhotosAction, Photo, FirestoreDate } from "./../../types";

export const onFetchMorePhotosRequestSuccess = (
  state: PhotosState,
  action: PhotosAction
) => {
  // we combine photos in state with new photos
  //@ts-ignore
  const photos: IPhoto[] = [...state.photos, ...action.photos];

  //console.log("onFetchMorePhotosRequestSuccess", action, state, photos);

  return {
    ...state,
    photos,
    loading: false,
    error: false,
    nextPageDocRef: action.nextPageDocRef,
    hasNextPage: action.hasNextPage as boolean,
  };
};

export const onAddPhotoError = (
  state: PhotosState,
  action: PhotosAction
): PhotosState => {
  return {
    ...state,
    addReqs: {
      ...state.addReqs,
      numberOfActiveReqs: state.addReqs.numberOfActiveReqs - 1,
    },
  };
};

//onAddPhoto
export const onGetAddedPhotoSuccess = (
  state: PhotosState,
  action: PhotosAction
): PhotosState => {
  if (action.photo === undefined)
    throw new Error(`No photo  on ${action.type}`);

  const photos = state.photos
    ? [
        action.photo,
        //@ts-ignore
        ...state.photos,
      ]
    : [action.photo];

  return {
    ...state,
    photos,
    addReqs: {
      ...state.addReqs,
      numberOfActiveReqs: state.addReqs.numberOfActiveReqs - 1,
    },
  };
};

export const onEditPhotoError = (
  state: PhotosState,
  action: PhotosAction
): PhotosState => {
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
  state: PhotosState,
  action: PhotosAction
): PhotosState => {
  if (typeof action.photoOrId === "string") {
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
  } else {
    return {
      ...state,
      editReqs: {
        ...state.editReqs,
        activeReqIds: state.editReqs.activeReqIds.filter(
          (id) => id !== (action.photoOrId as Photo<FirestoreDate>).id
        ),
      },
      photos: (state.photos as Photo<FirestoreDate>[]).map((photo) =>
        photo.id === (action.photoOrId as Photo<FirestoreDate>).id
          ? (action.photoOrId as Photo<FirestoreDate>)
          : photo
      ),
    };
  }
};

/* export const onAddPhotoStartRequest = (
  state: PhotosState,
  action: PhotosAction
): PhotosState => {
  return {
    ...state,
    numberOfAddedPhotoReqs: state.numberOfAddedPhotoReqs + 1
  };
}; */
/* 
export const onAddPhotoRequestSuccess = (
  state: IPhotosState,
  action: IPhotosAction
): IPhotosState => {
  if (!action.reqId)
    throw new Error("No reqId or photoReq on ADD_PHOTO_REQUEST_SUCCESS");

  const requests = setStatusOnReqInfoImmutable(
    state.requests,
    action.reqId,
    "success",
    "get_photo"
  );

  return {
    ...state,
    requests,
    addLoading: false,
    addError: false,
  };
};

export const onAddPhotoRequestError = (
  state: IPhotosState,
  action: IPhotosAction
): IPhotosState => {
  if (!action.reqId) throw new Error("No reqId  on ADD_PHOTO_REQUEST_ERROR");

  const requests = setStatusOnReqInfoImmutable(
    state.requests,
    action.reqId,
    "error",
    "done"
  );

  return {
    ...state,
    requests,
    addLoading: action.isLastAddPhotoReq === true ? false : true,
    addError: action.isLastAddPhotoReq === true ? true : false,
  };
}; */

/*
export const onGetAddedPhotoError = (
  state: IPhotosState,
  action: IPhotosAction
): IPhotosState => {
  if (!action.reqId) throw new Error(`No reqId on ${action.type}`);

  const requests = deleteRequestAndGetRequests(state.requests, action.reqId);

  return {
    ...state,
    requests,
  };
};

const deleteRequestAndGetRequests = (
  reqsFromState: TPhotoReqs,
  reqId: string
): TPhotoReqs => {
  const requests = new Map(reqsFromState);

  if (!requests.has(reqId))
    throw new Error(`No request info for that reqId - ${reqId}`);

  requests.delete(reqId);

  return requests;
};

export const onEditPhotoStartRequest = (
  state: IPhotosState,
  action: IPhotosAction
): IPhotosState => {
  if (!action.reqId || !action.photoReq)
    throw new Error("No reqId or photoReq on EDIT_PHOTO_START_REQUEST");

  const requests = addNewReqInfoImmutable(
    state.requests,
    action.reqId,
    action.photoReq
  );

  return {
    ...state,
    requests,
    editLoading: true,
    editAnotherForm: false,
    editError: false,
  };
};

export const onEditPhotoRequestSuccess = (
  state: IPhotosState,
  action: IPhotosAction
): IPhotosState => {
  if (state.photos === undefined) throw new Error("No photo state");

  if (!action.reqId)
    throw new Error("No reqId or photoReq on EDIT_PHOTO_REQUEST_SUCCESS");

  const requests = setStatusOnReqInfoImmutable(
    state.requests,
    action.reqId,
    "success",
    "get_photo"
  );

  let photos;

  // IF WE HAVE PHOTO_ID IT MEANS THAT EDITED PHOTO
  // NOT IN SEARCH TERMS
  if (action.photoId) {
    photos = new Map(state.photos);

    photos.delete(action.photoId);
  } else {
    photos = state.photos;
  }

  return {
    ...state,
    requests,
    photos,
    editLoading: action.isLastEditPhotoReq === true ? false : true,
    editError: false,
  };

  /* if (action.photoId) {
    if (state.photos === undefined) throw new Error("No photo state");

    const photos = new Map(state.photos);
    photos.delete(action.photoId);
    return {
      ...state,
      requests,
      photos,
      editLoading: action.isLastEditPhotoReq === true ? false : true,
      editError: false,
    };
  } else {
    return {
      ...state,
      requests,
      editLoading: action.isLastEditPhotoReq === true ? false : true,
      editError: false,
    };
  } /
};

export const onEditPhotoRequestError = (
  state: IPhotosState,
  action: IPhotosAction
): IPhotosState => {
  if (!action.reqId) throw new Error("No reqId  on EDIT_PHOTO_REQUEST_ERROR");

  const requests = setStatusOnReqInfoImmutable(
    state.requests,
    action.reqId,
    "error",
    "done"
  );

  return {
    ...state,
    requests,
    editLoading: action.isLastEditPhotoReq === true ? false : true,
    editError: action.isLastEditPhotoReq === true ? true : false,
  };
};



export const onGetEditedPhotoError = (
  state: IPhotosState,
  action: IPhotosAction
): IPhotosState => {
  if (!action.reqId) throw new Error(`No reqId on ${action.type}`);

  const requests = deleteRequestAndGetRequests(state.requests, action.reqId);

  return {
    ...state,
    requests,
  };
};

//REMOVE_PHOTO_REQUEST_INFO
export const onRemovePhotoRequestInfo = (
  state: IPhotosState,
  action: IPhotosAction
): IPhotosState => {
  if (action.reqId === undefined)
    throw new Error("No reqId on REMOVE_PHOTO_REQUEST_INFO");

  const requests = new Map(state.requests);

  if (!requests.has(action.reqId))
    throw new Error(`No request info for that reqId - ${action.reqId}`);

  requests.delete(action.reqId);

  return {
    ...state,
    requests,
  };
};

export const onDeletePhoto = (
  state: IPhotosState,
  action: IPhotosAction
): IPhotosState => {
  if (state.photos === undefined || action.photoId === undefined)
    throw new Error("No photo state or photoId on action");

  const photos = new Map(state.photos);

  photos.delete(action.photoId);

  return {
    ...state,
    photos,
  };
};
 
 */

/* export const onFetchMorePhotosRequestSuccess = (
  state: IPhotosState,
  action: IPhotosAction
) => {
  // we combine photos in state with new photos
  //@ts-ignore
  const photos: TPhotosData = new Map([...state.photos, ...action.photos]);

  //console.log("onFetchMorePhotosRequestSuccess", action, state, photos);

  return {
    ...state,
    photos,
    loading: false,
    error: false,
    nextPageDocRef: action.nextPageDocRef,
    hasNextPage: action.hasNextPage as boolean,
  };
};
 */
