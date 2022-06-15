//import { PhotoSliderProps } from "./../../container/PhotoSlider/PhotoSliderWidget";
//import Box from "@mui/system/Box";
import React, {
  ComponentProps,
  FC,
  MutableRefObject,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
//import { useCarousel } from "../../../../container/Carousel/hook/useCarousel";
//import { Photo, FirestoreDate } from "lizzygram-common-data/dist/types";
//import { useImgZoom } from "../useImgZoom";
import {
  useIncreaseIndexAfterFetchPhotos,
  useMakeFetchMore,
  calcActives,
} from "./usePhotoSlider.helper";
import { useDispatch, useSelector } from "react-redux";
import { usePhotos } from "../../../loadPhotos";
import { useEditor } from "../../../../auth/hook/useEditor";
import { GlobalState } from "../../../../types";
import { useCarousel } from "../../../../container/Carousel/hook/useCarousel";
import { FirestoreDate, Photo } from "lizzygram-common-data/dist/types";
import { editPhotoStartRequestAC } from "../../../addEditPhoto";
import { hidePhotoSliderAC } from "../../store/action";
import useFullscreen from "../../../../hook/useFullscreen";
import { downloadPhotoUrl } from "../../../../config";
import useWithDesc from "../useWithDesc";

/* import SliderBar, { SliderBarProps } from "../../SliderBar";
  //import { FullscreenProps } from "../../../../component/Fullscreen";
  import SliderChildren, { SliderChildrenProps } from "./../../SliderChidren";
  import SliderControls, {
    SliderControlsProps,
  } from "../../../component/SliderControls";
  import { isIncreaseAfterLoading } from "./PhotoSliderWidget.helper"; */

const onFetchMore =
  (hasNextPage: boolean, loading: boolean, loadMorePhotos: () => void) =>
  () => {
    //console.log("ON FETCH MORE", photos, hasNextPage, loading);
    if (hasNextPage === true && loading === false) {
      loadMorePhotos();
    }
  };

export const usePhotoSlider = () => {
  const dispatch = useDispatch();

  const { width: descWidth, toggleDesc } = useWithDesc();

  const [gZoom, setGZoom] = useState(0);

  const { photos, loading, hasNextPage, error, loadMore } = usePhotos();

  //const { handleSliderChange, cancel, zoom, value } = useImgZoom();

  const activePhotoIndex = useSelector<GlobalState, number>(
    (state) => state.photoSlider.activePhotoIndex
  );

  const photosLength = (photos as Photo<any>[]).length;

  /* const { activePhoto, activePhotoIndex } = calcActives(
    photos as Photo<any>[],
    activePhotoId
  ); */

  const { activeIndex, increaseIndex, decreaseIndex } = useCarousel(
    photosLength,
    activePhotoIndex
  );

  const activePhoto = (photos as Photo<FirestoreDate>[])[activeIndex];

  /*  useIncreaseIndexAfterFetchPhotos(
    photosLength,
    loading,
    activeIndex,
    increaseIndex
  );

  const fetchMore = useMakeFetchMore({
    photos, loading, hasNextPage, loadMore
  }); */

  const { userUid, user } = useEditor();

  const isEditor = user?.isEditor as boolean;

  const editedPhotoIds = useSelector<GlobalState, string[]>(
    (state) => state.addEditPhoto.editReqs.reqIds
  );

  // FULLSCREEN
  const fullscreen = useFullscreen();

  const onClose = useCallback(() => {
    fullscreen.exitFullscreen();

    setTimeout(() => {
      dispatch(hidePhotoSliderAC());
    }, 100);
  }, []);

  /*  const activePhoto: Photo<FirestoreDate> =
    photos === undefined ? undefined : photos.filter((photo) => photo.);
 */

  const showEditPhotoForm =
    activePhoto === undefined
      ? () => {}
      : () => {
          if (fullscreen.isFullscreen === true) fullscreen.exitFullscreen();

          setTimeout(() => {
            dispatch(editPhotoStartRequestAC(activePhoto?.id));
          }, 100);
        };

  const fetchMore = useCallback(onFetchMore(hasNextPage, loading, loadMore), [
    loadMore,
  ]);

  const isEditableActivePhoto =
    activePhoto === undefined ? false : userUid === activePhoto.addedByUserUID;
  const isEditingActivePhoto =
    activePhoto === undefined ? false : editedPhotoIds.includes(activePhoto.id);

  return {
    photos,
    photosLength,
    loading,
    hasNextPage,
    error,
    loadMore,
    onClose,
    showEditPhotoForm,
    isEditableActivePhoto,
    isEditingActivePhoto,
    isEditor,
    userUid,
    activePhoto,
    downloadPhotoUrl,
    activePhotoIndex: activeIndex,
    increaseIndex,
    decreaseIndex,
    descWidth,
    toggleDesc,
    fetchMore,
    gZoom,
    setGZoom,
    ...fullscreen,
  };
};
