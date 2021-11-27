import { MutableRefObject, useCallback, useRef } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { usePhotos } from "../../../hook/usePhotos";
import { numberOfPhotosPerQuery } from "../../../../config";
import { GlobalState } from "../../../../types";
import {
  showPhotoSliderAC,
  editPhotoStartRequestAC,
} from "../../../store/action";

export const useWallOfPhotos = () => {
  const dispatch = useDispatch();

  const showPhotoSlider = useCallback(
    (activePhotoIndex: number) => dispatch(showPhotoSliderAC(activePhotoIndex)),
    []
  );

  const showEditPhotoForm = useCallback(
    (photoId: string) => dispatch(editPhotoStartRequestAC(photoId)),
    []
  );

  const isSearch = useSelector<GlobalState, boolean>(
    (state) => state.search.isSearch
  );

  const { editedPhotosIds, numberOfAddedPhotos, isShowPhotoSlider } =
    useSelector<
      GlobalState,
      {
        editedPhotosIds: string[];
        numberOfAddedPhotos: number;
        isShowPhotoSlider: boolean;
      }
    >(
      (state) => ({
        editedPhotosIds: state.photos.editReqs.reqIds,
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

  return {
    //indexObservable,
    photos,
    editedPhotosIds,
    numberOfAddedPhotos,
    loadMorePhotos,
    reLoadPhotos,
    hasNextPage,
    loading,
    //addPhotoLoading,
    isError: error,
    isSearch,
    showEditPhotoForm: showEditPhotoForm,
    showPhotoSlider: showPhotoSlider,
    userUID,
    numberOfPhotosPerQuery,
    isShowPhotoSlider,
  };
};
