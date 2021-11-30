import { MutableRefObject, useCallback, useRef } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { usePhotos } from "../../../hook/usePhotos";
import {
  numberOfPhotosPerQuery,
  photoCardWidth,
  photoCardHeight,
  photoCardMarginBottom,
  photoCardMarginLeft,
} from "../../../../config";
import { GlobalState } from "../../../../types";
import {
  showPhotoSliderAC,
  editPhotoStartRequestAC,
} from "../../../store/action";
import { useInfiniteScroll } from "../InfiniteScroll/hook/useInfiniteScroll";
import { WallOfPhotosProps } from "../WallOfPhotosWidget";

export const useWallOfPhotos = (): WallOfPhotosProps => {
  const dispatch = useDispatch();

  const showPhotoSlider = useCallback(
    (photoId: string) => dispatch(showPhotoSliderAC(photoId)),
    []
  );

  const showEditPhotoForm = useCallback(
    (photoId: string) => dispatch(editPhotoStartRequestAC(photoId)),
    []
  );

  const isSearch = useSelector<GlobalState, boolean>(
    (state) => state.search.isSearch,
    shallowEqual
  );

  const { editedPhotoIds, numberOfAddedPhotos, isShowPhotoSlider } =
    useSelector<
      GlobalState,
      {
        editedPhotoIds: string[];
        numberOfAddedPhotos: number;
        isShowPhotoSlider: boolean;
      }
    >(
      (state) => ({
        editedPhotoIds: state.photos.editReqs.reqIds,
        numberOfAddedPhotos: state.photos.addReqs.numberOfActiveReqs,
        isShowPhotoSlider: state.photos.showPhotoSlider,
      }),
      shallowEqual
    );

  const userUID = "userUID";
  /* const userUID = useSelector<GlobalState, string>((state) =>
        state.auth.user ? state.auth.user.uid : ""
      );  */

  const {
    photos,
    hasNextPage,
    loading,
    //addPhotoLoading,
    error,
    loadMore: loadMorePhotos,
    loadPhotos: reLoadPhotos,
  } = usePhotos();

  const {
    visibleIndex,
    itemsArrays: arraysOfPhotos,
    numberOfPages,
    itemsWrapperHeight,
    containerWidth,
    numberOfItemsByPage,
  } = useInfiniteScroll(
    photos,
    numberOfPhotosPerQuery,
    photoCardWidth,
    photoCardHeight,
    photoCardMarginLeft,
    photoCardMarginBottom,
    hasNextPage,
    numberOfAddedPhotos,
    loading,
    loadMorePhotos
  );

  /*  activeObservableIndex: number;
  photos: Photo<FirestoreDate>[][] | undefined;
  loadMorePhotos: () => void;
  reLoadPhotos: () => void;
  hasNextPage: boolean;
  loading: boolean;
  editedPhotoIds: string[];
  //numberOfAddedPhotos: number;
  isError: boolean;
  isSearch: boolean;
  showPhotoSlider: (event: any) => void;
  showEditPhotoForm: () => void;
  userUID: string;
  //numberOfPhotosPerQuery: number | undefined;
  isShowPhotoSlider: boolean;

  pageHeight: number;
  numberOfPages: number;
  numberOfPhotosByPage: number; */
  return {
    //indexObservable,
    activeObservableIndex: visibleIndex,
    photos: arraysOfPhotos,
    editedPhotoIds,
    //numberOfAddedPhotos,
    loadMorePhotos,
    reLoadPhotos,
    hasNextPage,
    loading,
    //addPhotoLoading,
    isError: error,
    isSearch,
    showEditPhotoForm,
    showPhotoSlider,
    userUID,
    //numberOfPhotosPerQuery,
    isShowPhotoSlider,

    numberOfPages,
    pageHeight: itemsWrapperHeight,
    containerWidth,
    numberOfPhotosByPage: numberOfItemsByPage,
  };
};
