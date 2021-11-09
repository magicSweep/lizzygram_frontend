import Box from "@mui/system/Box";
import React, {
  FC,
  MutableRefObject,
  useCallback,
  useEffect,
  useRef,
} from "react";
import { useCarousel } from "../../../container/Carousel/hook/useCarousel";
import { Photo, FirestoreDate } from "../../types";
import { useImgZoom } from "../../hook/useImgZoom";
import SliderBar from "../SliderBar";
import SliderChildren from "./SliderChidren";
import SliderControls from "../SliderControls";
import { isIncreaseAfterLoading } from "./helper";

export type PhotoSliderProps = {
  editedPhotoIds: string[];
  //initActiveIndex: number;
  //photoState: IPhotosState;
  photos: Photo<FirestoreDate>[] | undefined;
  loading: boolean;
  hasNextPage: boolean;
  error: boolean;
  loadMorePhotos: () => void;
  onClose: (event: any) => void;
  onToggleDesc: (event: any) => void;
  isEditableActivePhoto: boolean;
  showEditPhotoForm: () => void;
  downloadOriginalPhotoUrl: string;
  activeIndex: number;
  increaseIndex: () => void;
  decreaseIndex: () => void;
};

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

const onFetchMore =
  (valuesRef: MutableRefObject<any>, loadMorePhotos: () => void) => () => {
    const { photos, hasNextPage, loading } = valuesRef.current;

    //console.log("ON FETCH MORE", photos, hasNextPage, loading);
    if (photos !== undefined && hasNextPage === true && loading === false) {
      loadMorePhotos();
    }
  };

const PhotoSliderWidget: FC<PhotoSliderProps> = ({
  photos,
  //initActiveIndex,
  isEditableActivePhoto,
  onClose,
  onToggleDesc,
  showEditPhotoForm,
  downloadOriginalPhotoUrl,
  loading,
  error,
  hasNextPage,
  loadMorePhotos,
  activeIndex,
  increaseIndex,
  decreaseIndex,
}) => {
  const photosLength = photos === undefined ? 0 : photos.length;

  const mainRef: MutableRefObject<any> = useRef({
    photos,
    hasNextPage,
    loading,
  });

  mainRef.current.photos = photos;
  mainRef.current.hasNextPage = hasNextPage;
  mainRef.current.loading = loading;

  /* const { activeIndex, increaseIndex, decreaseIndex } = useCarousel(
    photosLength,
    initActiveIndex
  ); */

  const { handleSliderChange, cancel, zoom, value } = useImgZoom();

  useIncreaseIndexAfterFetchPhotos(
    photosLength,
    loading,
    activeIndex,
    increaseIndex
  );

  const fetchMore = useCallback(onFetchMore(mainRef, loadMorePhotos), []);

  console.log("[RENDER PHOTO SLIDER WIDGET]", zoom, value);

  return (
    <>
      <Box className="relative w-full h-full m-auto bg-black">
        <SliderChildren
          photos={photos}
          activeIndex={activeIndex}
          zoom={zoom}
          isEditableActivePhoto={isEditableActivePhoto}
          photosLoading={loading}
          photosError={error}
        />

        {zoom === 0 && (
          <SliderControls
            itemsLength={photosLength}
            increaseIndex={increaseIndex}
            decreaseIndex={decreaseIndex}
            activeIndex={activeIndex}
            fetchMore={fetchMore}
            hasNextPage={hasNextPage}
          />
        )}

        <SliderBar
          handleSliderChange={handleSliderChange}
          zoom={value}
          cancel={cancel}
          onClose={onClose}
          onToggleDesc={onToggleDesc}
          isEditable={isEditableActivePhoto}
          showEditPhotoForm={showEditPhotoForm}
          downloadOriginalPhotoUrl={downloadOriginalPhotoUrl}
        />
      </Box>
    </>
  );
};

export default PhotoSliderWidget;
