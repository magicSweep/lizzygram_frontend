import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { getAllPhotos } from "../../service/DbService";
import {
  allPhotosStartNewRequestAC,
  allPhotosStartMoreRequestAC,
  fetchMorePhotosRequestSuccessAC,
  allPhotosRequestSuccessAC,
  allPhotosRequestErrorAC,
} from "../../store/action";
import { compose, tap, then, _catch } from "fmagic";
//import { GetAllPhotosResData } from "./../../types";
import { Photo, FirestoreDate } from "lizzygram-common-data/dist/types";
import { SearchState } from "./../../../search/types";
import { GlobalState } from "./../../../types";
import { MutableRefObject, useEffect, useRef } from "react";
import { isNeedNewRequest, makeGetAllPhotosResData } from "./usePhotos.helper";
//import { DocumentData, QuerySnapshot } from "firebase/firestore";
import { ResponseWithCursor } from "../../../firebase/types";
import { useAuth } from "../../../auth";

export interface IPhotosReqData {
  isLoadMore: boolean;
  searchState: SearchState;
  nextPageDocRef?: any;
}

export const startNew = (
  userUid: string,
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
    () => getAllPhotos(userUid, searchState.terms, nextPageDocRef),
    then((resData: ResponseWithCursor<Photo<FirestoreDate>>) => {
      const photosStateData = makeGetAllPhotosResData(resData);

      console.log("-----------ALL PHOTOS", photosStateData, resData);

      if (isLoadMore === false) {
        dispatch(allPhotosRequestSuccessAC(photosStateData));
      } else {
        dispatch(fetchMorePhotosRequestSuccessAC(photosStateData));
      }
    }),
    _catch((err) => {
      console.error("GET ALL PHOTOS ERROR");
      console.error(err.message);
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

  const mainRef: MutableRefObject<any> = useRef({});

  const { userUid } = useAuth();

  mainRef.current = useSelector<
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

  const loadPhotos = startNew(
    userUid,
    dispatch,
    false,
    mainRef.current.searchState
  );

  const loadMore = startNew(
    userUid,
    dispatch,
    true,
    mainRef.current.searchState,
    mainRef.current.nextPageDocRef
  );

  useEffect(() => {
    /* console.log(
      "-----------isNeedNewRequest",
      isNeedNewRequest(
        mainRef.current.searchState.terms,
        mainRef.current.loading
      )
    ); */
    if (
      isNeedNewRequest(
        mainRef.current.searchState.terms,
        mainRef.current.loading
      )
    ) {
      console.log("-----------------------load photos");
      loadPhotos();
    }
  }, [mainRef.current.searchState]);

  return {
    ...mainRef.current,
    loadPhotos,
    loadMore,
  };
};
