import React, { useCallback } from "react";
import { hidePhotoSliderAC, editPhotoStartRequestAC } from "../../store/action";
import { useDispatch, useSelector } from "react-redux";
import { useCarousel } from "../../../container/Carousel/hook/useCarousel";
//import { Photo, FirestoreDate } from "lizzygram-common-data/dist/types";
import { usePhotos } from "../../hook/usePhotos";
import { GlobalState } from "../../../types";
import { PhotoSliderWithDescProps } from "./PhotoSliderWithDesc";
import { useAuth } from "../../../auth";
import { FirestoreDate, Photo } from "lizzygram-common-data/dist/types";

export const usePhotoSlider = (): PhotoSliderWithDescProps => {
  const dispatch = useDispatch();

  const { photos, loading, hasNextPage, error, loadMore } = usePhotos();

  const photosLength = photos === undefined ? 0 : photos.length;

  const activePhotoIndex = useSelector<GlobalState, number>(
    (state) => state.photos.activePhotoIndex
  );

  const { userUid } = useAuth();

  const editedPhotoIds = useSelector<GlobalState, string[]>(
    (state) => state.photos.editReqs.reqIds
  );

  const { activeIndex, increaseIndex, decreaseIndex } = useCarousel(
    photosLength,
    activePhotoIndex
  );

  const onClose = useCallback(() => dispatch(hidePhotoSliderAC()), []);

  const activePhoto: Photo<FirestoreDate> =
    photos === undefined ? undefined : photos[activeIndex];

  const showEditPhotoForm =
    activePhoto === undefined
      ? () => {}
      : () => dispatch(editPhotoStartRequestAC(activePhoto.id));

  const isEditableActivePhoto =
    activePhoto === undefined ? false : userUid === activePhoto.addedByUserUID;
  const isEditingActivePhoto =
    activePhoto === undefined ? false : editedPhotoIds.includes(activePhoto.id);

  return {
    photos,
    loading,
    hasNextPage,
    error,
    loadMorePhotos: loadMore,
    onClose,
    isEditableActivePhoto,
    showEditPhotoForm,
    userUid,
    activeIndex,
    increaseIndex,
    decreaseIndex,
    activePhoto,
    isEditingActivePhoto,
  };
};
