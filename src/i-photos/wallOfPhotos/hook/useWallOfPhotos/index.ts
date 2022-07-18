import { useCallback } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { usePhotos } from "../../../loadPhotos";
import {
  numberOfPhotosPerQuery,
  photoCardWidth,
  photoCardHeight,
  downloadPhotoUrl,
} from "../../../../config";
import { GlobalState } from "../../../../types";
import { editPhotoRequestStartAC } from "../../../addEditPhoto";
import { showPhotoSliderAC } from "../../../photoSlider";
//import { useInfiniteScroll } from "../InfiniteScroll/hook/useInfiniteScroll";
//import { WallOfPhotosProps } from "../WallOfPhotosWidget";
//import { useAuth } from "../../../../auth";
import { useEditor } from "../../../../auth/hook/useEditor";
import { useFavorite } from "../../../favorite";

export const useWallOfPhotos = () => {
  const dispatch = useDispatch();

  const showPhotoSlider = useCallback(
    (photoIndex: number) => dispatch(showPhotoSliderAC(photoIndex)),
    []
  );

  const showEditPhotoForm = useCallback(
    (photoId: string) => dispatch(editPhotoRequestStartAC(photoId)),
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
        editedPhotoIds: state.addEditPhoto.editReqs.activeReqIds,
        numberOfAddedPhotos: state.addEditPhoto.addReqs.numberOfActiveReqs,
        isShowPhotoSlider: state.photoSlider.show,
      }),
      shallowEqual
    );

  const { userUid, user } = useEditor();
  //const userUID = "userUID";
  /* const userUID = useSelector<GlobalState, string>((state) =>
        state.auth.user ? state.auth.user.uid : ""
      );  */

  //alert(`useWallOfphotos | ${photoCardHeight} | ${photoCardWidth}`);

  const {
    photos,
    hasNextPage,
    loading,
    //addPhotoLoading,
    error,
    loadMore: loadMorePhotos,
    loadPhotos: reLoadPhotos,
  } = usePhotos();

  /*  const {
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
  ); */

  const {
    favoriteReqs,
    add: addToFavorite,
    remove: removeFromFavorite,
  } = useFavorite(userUid);

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
    //activeObservableIndex: visibleIndex,
    photos,
    error,
    editedPhotoIds,
    numberOfAddedPhotos,
    loadMorePhotos,
    reLoadPhotos,
    hasNextPage,
    loading,
    //addPhotoLoading,
    isError: error,
    isSearch,
    showEditPhotoForm,
    showPhotoSlider,
    userUid,
    isEditor: user?.isEditor,
    //numberOfPhotosPerQuery,
    isShowPhotoSlider,
    numberOfPhotosPerQuery,
    photoCardWidth,
    photoCardHeight,

    downloadPhotoUrl,
    //numberOfPages,
    // pageHeight: itemsWrapperHeight,
    // containerWidth,
    // numberOfPhotosByPage: numberOfItemsByPage,

    favoriteReqs,
    addToFavorite,
    removeFromFavorite,
  };
};
