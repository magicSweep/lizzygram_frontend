import React, {
  FC,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
//import { action } from "@storybook/addon-actions";
import { Story } from "@storybook/react";
import { photos } from "./../../mock/fake.data";

//import { createStore, combineReducers, applyMiddleware, compose } from "redux";
//import { Provider } from "react-redux";
//import thunk from "redux-thunk";
import PhotoSliderWithDesc from "./PhotoSliderWithDesc";
import Button from "@mui/material/Button";
import { Photo, FirestoreDate } from "lizzygram-common-data/dist/types";
import wait from "waait";
import {
  fetchMorePhotos,
  fetchPhotos,
  IPhotoState,
  initPhotoState,
} from "./../../mock/fetch";
import SliderModal from "../../component/SliderModal";
import { useCarousel } from "../../../container/Carousel/hook/useCarousel";
import useFullscreen from "../../../hook/useFullscreen";

export default {
  component: PhotoSliderWithDesc,
  title: "Photos/PhotoSlider/PhotoSliderWithDesc",
  decorators: [],
  excludeStories: /.*Data$/,
};

let init = false;

const editedPhotoIds = [
  /* "234234" */
];

const PhotoSlider: FC<{ show: boolean; setShow: any }> = ({
  show,
  setShow,
}) => {
  const length = photos === undefined ? 0 : photos.length;

  const { activeIndex, increaseIndex, decreaseIndex } = useCarousel(length, 0);

  const [photoState, setPhotoState] = useState<IPhotoState>({
    photos: undefined,
    hasNextPage: true,
    nextPageDocRef: "ref",
    loading: true,
    error: false,
  });

  const loadPhotos = fetchPhotos(setPhotoState);

  const loadMorePhotos = fetchMorePhotos(setPhotoState);

  const onClose = useCallback((event: any) => {
    event.preventDefault();
    event.stopPropagation();
    setShow(false);
  }, []);

  const isEditableActivePhoto = false;

  const { isFullscreen, exitFullscreen, requestFullscreen, fullscreenElemRef } =
    useFullscreen();

  useEffect(() => {
    if (show && !init) {
      loadPhotos();
      init = true;
    }
  }, [show]);

  return (
    <>
      <PhotoSliderWithDesc
        activePhoto={photos[activeIndex]}
        isEditingActivePhoto={false}
        activeIndex={activeIndex}
        increaseIndex={increaseIndex}
        decreaseIndex={decreaseIndex}
        //editedPhotoIds={editedPhotoIds}
        photos={photoState.photos}
        loading={photoState.loading}
        hasNextPage={photoState.hasNextPage}
        error={photoState.error}
        loadMorePhotos={loadMorePhotos}
        onClose={onClose}
        showEditPhotoForm={() => console.log("showEditPhotoForm")}
        isEditableActivePhoto={isEditableActivePhoto}
        //downloadOriginalPhotoUrl="http://download.photo.url"
        exitFullscreen={exitFullscreen}
        requestFullscreen={requestFullscreen}
        isFullscreen={isFullscreen}
        fullscreenElemRef={fullscreenElemRef}
        isEditor={true}
        userUid="uid"
      />
    </>
  );
};

export const Default = () => {
  const [show, setShow] = useState(false);

  return (
    <>
      <Button onClick={() => setShow(true)}>Show photo slider</Button>

      <SliderModal open={show}>
        <PhotoSlider show={show} setShow={setShow} />
      </SliderModal>
    </>
  );
};
