import React, { useCallback } from "react";
import { hidePhotoSliderAC, editPhotoStartRequestAC } from "../../store/action";
import { useDispatch, useSelector } from "react-redux";
import { useCarousel } from "../../../container/Carousel/hook/useCarousel";
//import { Photo, FirestoreDate } from "lizzygram-common-data/dist/types";
import { usePhotos } from "../../hook/usePhotos";
import { GlobalState } from "../../../types";
import { PhotoSliderWithDescProps } from "./PhotoSliderWithDesc";
import { useEditor } from "../../../auth/hook/useEditor";
import { FirestoreDate, Photo } from "lizzygram-common-data/dist/types";
import useFullscreenElem from "../../../hook/useFullscreen";
import { useFavorite } from "../../hook/useFavorite";

export const usePhotoSlider = (): PhotoSliderWithDescProps => {
  const dispatch = useDispatch();

  const { photos, loading, hasNextPage, error, loadMore } = usePhotos();

  const photosLength = photos === undefined ? 0 : photos.length;

  const activePhotoIndex = useSelector<GlobalState, number>(
    (state) => state.photos.activePhotoIndex
  );

  //const { userUid } = useAuth();

  const {
    userUid,
    user: { isEditor },
  } = useEditor();

  const editedPhotoIds = useSelector<GlobalState, string[]>(
    (state) => state.photos.editReqs.reqIds
  );

  const { activeIndex, increaseIndex, decreaseIndex } = useCarousel(
    photosLength,
    activePhotoIndex
  );

  const { requestFullscreen, exitFullscreen, isFullscreen, fullscreenElemRef } =
    useFullscreenElem();

  const onClose = useCallback(() => {
    exitFullscreen();

    setTimeout(() => {
      dispatch(hidePhotoSliderAC());
    }, 100);
  }, []);

  const activePhoto: Photo<FirestoreDate> =
    photos === undefined ? undefined : photos[activeIndex];

  const showEditPhotoForm =
    activePhoto === undefined
      ? () => {}
      : () => {
          if (isFullscreen === true) exitFullscreen();

          setTimeout(() => {
            dispatch(editPhotoStartRequestAC(activePhoto.id));
          }, 100);
        };

  const isEditableActivePhoto =
    activePhoto === undefined ? false : userUid === activePhoto.addedByUserUID;
  const isEditingActivePhoto =
    activePhoto === undefined ? false : editedPhotoIds.includes(activePhoto.id);

  const {
    favoriteReqs,
    add: addFavorite,
    remove: removeFavorite,
  } = useFavorite(userUid);

  return {
    photos,
    loading,
    hasNextPage,
    error,
    loadMorePhotos: loadMore,
    onClose,
    isEditableActivePhoto,
    isEditor,
    showEditPhotoForm,
    userUid,
    activeIndex,
    increaseIndex,
    decreaseIndex,
    activePhoto,
    isEditingActivePhoto,
    requestFullscreen,
    exitFullscreen,
    isFullscreen,
    fullscreenElemRef,
    favoriteReqs,
    addFavorite,
    removeFavorite,
  };
};
