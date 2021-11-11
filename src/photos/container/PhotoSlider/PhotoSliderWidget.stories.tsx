import React, {
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
import PhotoSliderWidget from "./PhotoSliderWidget";
import Button from "@mui/material/Button";
import { Photo, FirestoreDate } from "../../types";
import wait from "waait";
import {
  fetchMorePhotos,
  fetchPhotos,
  IPhotoState,
  initPhotoState,
} from "./../../mock/fetch";
import SliderModal from "../../component/SliderModal";
import { useCarousel } from "../../../container/Carousel/hook/useCarousel";

export default {
  component: PhotoSliderWidget,
  title: "Photos/PhotoSliderWidget",
  decorators: [],
  excludeStories: /.*Data$/,
};

let init = false;

const editedPhotoIds = [
  /* "234234" */
];

export const Default = () => {
  const [show, setShow] = useState(false);

  const [photoState, setPhotoState] = useState<IPhotoState>({
    photos: undefined,
    hasNextPage: true,
    nextPageDocRef: "ref",
    loading: true,
    error: false,
  });

  const length = photos === undefined ? 0 : photos.length;

  const { activeIndex, increaseIndex, decreaseIndex } = useCarousel(length, 0);

  const loadPhotos = fetchPhotos(setPhotoState);

  const loadMorePhotos = fetchMorePhotos(setPhotoState);

  const onClose = useCallback((event: any) => {
    event.preventDefault();
    event.stopPropagation();
    setShow(false);
  }, []);

  const isEditableActivePhoto = false;

  useEffect(() => {
    if (show && !init) {
      loadPhotos();
      init = true;
    }
  }, [show]);

  return (
    <>
      <Button onClick={() => setShow(true)}>Show photo slider</Button>

      <SliderModal open={show}>
        <PhotoSliderWidget
          activeIndex={activeIndex}
          increaseIndex={increaseIndex}
          decreaseIndex={decreaseIndex}
          isEditingActivePhoto={false}
          photos={photoState.photos}
          loading={photoState.loading}
          hasNextPage={photoState.hasNextPage}
          error={photoState.error}
          loadMorePhotos={loadMorePhotos}
          onClose={onClose}
          onToggleDesc={() => console.log("onToggleDesc")}
          showEditPhotoForm={() => console.log("showEditPhotoForm")}
          isEditableActivePhoto={isEditableActivePhoto}
          downloadOriginalPhotoUrl="http://download.photo.url"
        />
      </SliderModal>
    </>
  );
};
