import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { numberOfPhotosPerQuery } from "../../../config";
import { getAllPhotos } from "../../service/DbService";
import {
  allPhotosStartNewRequestAC,
  allPhotosStartMoreRequestAC,
  fetchMorePhotosRequestSuccessAC,
  allPhotosRequestSuccessAC,
  allPhotosRequestErrorAC,
} from "../../store/action";
import { compose, tap, then, _catch } from "fmagic";
import { Photo, FirestoreDate } from "./../../types";
import { SearchState } from "./../../../search/types";
import { GlobalState } from "./../../../types";
import { useEffect } from "react";
import { isNeedNewRequest } from "../../repository/helper";

export interface IPhotosReqData {
  isLoadMore: boolean;
  searchState: SearchState;
  nextPageDocRef?: any;
}

export const startNew = (
  dispatch: any,
  isLoadMore: boolean,
  searchState: SearchState,
  nextPageDocRef?: any
) =>
  compose(
    () => {
      if (isLoadMore === false) {
        //console.log("dispatch(allPhotosStartNewRequestAC())");
        dispatch(allPhotosStartNewRequestAC());
      } else {
        //console.log("dispatch(allPhotosStartMoreRequestAC()");
        dispatch(allPhotosStartMoreRequestAC());
      }
    },
    // SEND REQUEST
    () => getAllPhotos(searchState.terms, nextPageDocRef),
    then((resData) => {
      if (isLoadMore === false) {
        dispatch(allPhotosRequestSuccessAC(resData));
      } else {
        dispatch(fetchMorePhotosRequestSuccessAC(resData));
      }
    }),
    _catch((err) => {
      dispatch(allPhotosRequestErrorAC());
    })
  );

/* const startNew = (dispatch: any, data: IPhotosReqData) =>
  compose(
    () => {
      if (!data.isLoadMore) {
        dispatch(allPhotosStartNewRequestAC());
      } else {
        dispatch(allPhotosStartMoreRequestAC());
      }
    },
    // SEND REQUEST
    () => getAllPhotos(data.searchState.terms, data.nextPageDocRef),
    then((resData) => {
      if (!data.isLoadMore) {
        dispatch(allPhotosRequestSuccessAC(resData));
      } else {
        dispatch(fetchMorePhotosRequestSuccessAC(resData));
      }
    }),
    _catch((err) => {
      dispatch(allPhotosRequestErrorAC());
    })
  );
 */
export const usePhotos = () => {
  const dispatch = useDispatch();

  //const numberOfPhotosPerQuery = useContext(NumberOfPhotosPerQueryContext);

  //console.log("USE PHOTOS", numberOfPhotosPerQuery);

  const {
    loading,
    //addPhotoLoading,
    error,
    searchState,
    photos,
    hasNextPage,
    nextPageDocRef,
    numberOfAddedPhotoReqs,
    editedPhotosIds,
  } = useSelector<
    GlobalState,
    {
      loading: boolean;
      //addPhotoLoading: boolean;
      error: boolean;
      searchState: SearchState;
      photos: Photo<FirestoreDate>[] | undefined;
      hasNextPage: boolean;
      nextPageDocRef: any;
      numberOfAddedPhotoReqs: number;
      editedPhotosIds: string[];
    }
  >(
    (state) => ({
      loading: state.photos.loading,
      //addPhotoLoading: state.photos.addLoading,
      error: state.photos.error,
      searchState: state.search,
      photos: state.photos.photos,
      hasNextPage: state.photos.hasNextPage,
      nextPageDocRef: state.photos.nextPageDocRef,
      numberOfAddedPhotoReqs: state.photos.addReqs.numberOfActiveReqs,
      editedPhotosIds: state.photos.editReqs.activeReqIds,
    }),
    shallowEqual
  );

  const loadPhotos = startNew(dispatch, false, searchState);

  const loadMore = startNew(dispatch, true, searchState, nextPageDocRef);

  useEffect(() => {
    /*  console.log(
      "-----------isNeedNewRequest",
      isNeedNewRequest(searchState.terms, loading)
    ); */
    if (isNeedNewRequest(searchState.terms, loading)) {
      loadPhotos();
    }
  }, [searchState]);

  return {
    loading,
    //addPhotoLoading,
    error,
    searchState,
    photos,
    hasNextPage,
    nextPageDocRef,
    loadPhotos,
    loadMore,
    editedPhotosIds,
    numberOfAddedPhotoReqs,
  };
};
