//import Box from "@mui/system/Box";
import React, {
  ComponentProps,
  FC,
  MutableRefObject,
  useCallback,
  useEffect,
  useRef,
} from "react";
//import { useCarousel } from "../../../../container/Carousel/hook/useCarousel";
//import { Photo, FirestoreDate } from "lizzygram-common-data/dist/types";
import { useImgZoom } from "../useImgZoom";
import { useDispatch } from "react-redux";
import { usePhotos } from "../../../loadPhotos";
import { FirestoreDate, Photo } from "lizzygram-common-data/dist/types";
/* import SliderBar, { SliderBarProps } from "../../SliderBar";
  //import { FullscreenProps } from "../../../../component/Fullscreen";
  import SliderChildren, { SliderChildrenProps } from "./../../SliderChidren";
  import SliderControls, {
    SliderControlsProps,
  } from "../../../component/SliderControls";
  import { isIncreaseAfterLoading } from "./PhotoSliderWidget.helper"; */

export const useIncreaseIndexAfterFetchPhotos = (
  photosLength: number,
  loading: boolean,
  activeIndex: number,
  increaseIndex: () => void
) => {
  const mainRef: MutableRefObject<any> = useRef({
    prevPhotosLoading: false,
    prevPhotosLength: photosLength,
  });

  useEffect(() => {
    if (
      isIncreaseAfterLoading(
        photosLength > 0,
        mainRef.current.prevPhotosLoading,
        loading,
        mainRef.current.prevPhotosLength,
        activeIndex
      )
    ) {
      increaseIndex();
    }

    mainRef.current.prevPhotosLoading = loading;
    mainRef.current.prevPhotosLength = photosLength;
  }, [loading]);
};

export const onFetchMore =
  (valuesRef: MutableRefObject<any>, loadMorePhotos: () => void) => () => {
    const { photos, hasNextPage, loading } = valuesRef.current;

    //console.log("ON FETCH MORE", photos, hasNextPage, loading);
    if (photos !== undefined && hasNextPage === true && loading === false) {
      loadMorePhotos();
    }
  };

export const useMakeFetchMore = ({
  photos,
  hasNextPage,
  loading,
  loadMore,
}: Pick<
  ReturnType<typeof usePhotos>,
  "photos" | "hasNextPage" | "loading" | "loadMore"
>) => {
  const mainRef: MutableRefObject<any> = useRef({
    photos,
    hasNextPage,
    loading,
  });

  mainRef.current.photos = photos;
  mainRef.current.hasNextPage = hasNextPage;
  mainRef.current.loading = loading;

  const fetchMore = useCallback(onFetchMore(mainRef, loadMore), [loadMore]);

  return fetchMore;
};

export const calcActives = (
  photos: Photo<FirestoreDate>[],
  activePhotoId: string
) => {
  let activePhotoIndex = 0;
  let activePhoto: Photo<FirestoreDate> = {} as any;

  for (let i = 0; i < photos.length - 1; i++) {
    if (photos[i].id === activePhotoId) {
      activePhotoIndex = i;
      activePhoto = photos[i];
      break;
    }
  }

  return {
    activePhotoIndex,
    activePhoto,
  };
};

export const isIncreaseAfterLoading = (
  isPhotosData: boolean,
  prevLoading: boolean,
  loading: boolean,
  photosLength: number,
  activeIndex: number
) =>
  photosLength - activeIndex === 1 &&
  isPhotosData === true &&
  prevLoading === true &&
  loading === false;
