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
//import { useImgZoom } from "../../../hook/useImgZoom";
import SliderBar, { SliderBarProps } from "../../SliderBar";
//import { FullscreenProps } from "../../../../component/Fullscreen";
import SliderChildren, { SliderChildrenProps } from "./../../SliderChidren";
import SliderControls from "../../SliderControls";
import { isIncreaseAfterLoading } from "./PhotoSliderWidget.helper";
import { usePhotoSliderContext } from "../../../hook/usePhotoSliderContext";
//import { Photo } from "lizzygram-common-data/dist/types";

/* export type PhotoSliderProps = Omit<SliderChildrenProps, "zoom"> &
  Omit<
    SliderBarProps,
    | "handleSliderChange"
    | "cancel"
    | "zoom"
    | "imageExtension"
    | "googleDriveId"
  > &
  Omit<SliderControlsProps, "fetchMore" | "itemsLength"> & {
    loadMorePhotos: () => void;
  }; */

/* export type PhotoSliderProps = {
  sliderChildrenProps: SliderChildrenProps;
  sliderBarProps: SliderBarProps;
  sliderControlsProps: SliderControlsProps;
}; */

const useIncreaseIndexAfterFetchPhotos = (
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

/* const onFetchMore =
  (valuesRef: MutableRefObject<any>, loadMorePhotos: () => void) => () => {
    const { photos, hasNextPage, loading } = valuesRef.current;

    //console.log("ON FETCH MORE", photos, hasNextPage, loading);
    if (photos !== undefined && hasNextPage === true && loading === false) {
      loadMorePhotos();
    }
  }; */

/* const onFetchMore =
  (hasNextPage: boolean, loading: boolean, loadMorePhotos: () => void) =>
  () => {
    //console.log("ON FETCH MORE", photos, hasNextPage, loading);
    if (hasNextPage === true && loading === false) {
      loadMorePhotos();
    }
  }; */

const PhotoSliderWidget: FC = (/* {
  photos,
  //initActiveIndex,
  isEditable,
  isEditingActivePhoto,
  isEditor,
  onClose,
  onToggleDesc,
  showEditPhotoForm,
  //downloadPhotoData,
  userUid,
  photosLoading,
  photosError,
  hasNextPage,
  loadMorePhotos,
  activeIndex,
  increaseIndex,
  decreaseIndex,
  requestFullscreen,
  exitFullscreen,
  isFullscreen,
  placement,
  downloadPhotoUrl,
  //fullscreenElemRef,
} */) => {
  /* const photosLength = photos === undefined ? 0 : photos.length;

  const mainRef: MutableRefObject<any> = useRef({
    photos,
    hasNextPage,
    photosLoading,
  });

  mainRef.current.photos = photos;
  mainRef.current.hasNextPage = hasNextPage;
  mainRef.current.loading = photosLoading;
 */
  /* const { activeIndex, increaseIndex, decreaseIndex } = useCarousel(
    photosLength,
    initActiveIndex
  ); */

  //const { handleSliderChange, cancel, zoom, value } = useImgZoom();

  const {
    photos,
    isEditingActivePhoto,
    onClose,
    gZoom,
    photosLength,
    loading: photosLoading,
    activePhotoIndex,
    increaseIndex,
  } = usePhotoSliderContext();

  useIncreaseIndexAfterFetchPhotos(
    photosLength,
    photosLoading,
    activePhotoIndex,
    increaseIndex
  );

  /* const fetchMore = useCallback(onFetchMore(hasNextPage, loading, loadMorePhotos), [
    loadMorePhotos,
  ]); */

  console.log("[RENDER PHOTO SLIDER WIDGET]");

  return (
    <>
      <div
        /* ref={fullscreenElemRef}
        id="super_photo_slider_23klj2342" */
        className="relative w-full h-full bg-photocard overflow-auto"
      >
        <SliderChildren
          photos={photos}
          activeIndex={activePhotoIndex}
          zoom={gZoom}
          isEditingActivePhoto={isEditingActivePhoto}
          photosLoading={photosLoading}
        />

        {gZoom === 0 && (
          <SliderControls
          /* itemsLength={photosLength}
            increaseIndex={increaseIndex}
            decreaseIndex={decreaseIndex}
            activeIndex={activeIndex} 
            fetchMore={fetchMore}
            hasNextPage={hasNextPage}  */
          />
        )}

        <SliderBar
          /*  photos={photos}
          activeIndex={activeIndex}
          handleSliderChange={handleSliderChange}
          zoom={value}
          cancel={cancel} */
          onClose={onClose}
          /*  onToggleDesc={onToggleDesc} */
          /*  isEditable={isEditable}
          isEditor={isEditor}
          showEditPhotoForm={showEditPhotoForm}
          //downloadPhotoData={downloadPhotoData}
          userUid={userUid}
          imageExtension={
            photos === undefined ? "" : photos[activeIndex].imageExtention
          }
          googleDriveId={
            photos === undefined ? "" : photos[activeIndex].googleDriveId
          }
          requestFullscreen={requestFullscreen}
          exitFullscreen={exitFullscreen}
          isFullscreen={isFullscreen}
          placement={placement}
          downloadPhotoUrl={downloadPhotoUrl} */
        />
      </div>
    </>
  );
};

export default PhotoSliderWidget;
