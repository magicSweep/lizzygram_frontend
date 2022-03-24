import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
//import { action } from "@storybook/addon-actions";
import { Story } from "@storybook/react";
//import { photos } from "./../../mock/fake.data";

//import { createStore, combineReducers, applyMiddleware, compose } from "redux";
//import { Provider } from "react-redux";
//import thunk from "redux-thunk";
import PhotoSliderWidget, { PhotoSliderProps } from "./PhotoSliderWidget";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
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

export default {
  component: PhotoSliderWidget,
  title: "Photos/PhotoSlider/PhotoSliderWidget",
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

  const length = photoState.photos === undefined ? 0 : photoState.photos.length;

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

  console.log("---------------RENDER PHOTO SLIDER", photoState.photos);

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
          isEditor={false}
          userUid="uid"
          //downloadOriginalPhotoUrl="http://download.photo.url"
          exitFullscreen={() => {}}
          requestFullscreen={() => {}}
          isFullscreen={false}
        />
      </SliderModal>
    </>
  );
};

const Template: Story<PhotoSliderProps> = (args) => {
  return (
    <Box width="600px" height="400px" m="auto" boxShadow={2}>
      <PhotoSliderWidget {...args} />
    </Box>
  );
};

export const NoPhotos = Template.bind({});

NoPhotos.args = {
  activeIndex: 0,
  increaseIndex: () => console.log("increaseIndex"),
  decreaseIndex: () => console.log("decreaseIndex"),
  isEditingActivePhoto: false,
  photos: undefined,
  loading: false,
  hasNextPage: false,
  error: false,
  loadMorePhotos: () => console.log("loadMorePhotos"),
  onClose: () => console.log("onClose"),
  onToggleDesc: () => console.log("onToggleDesc"),
  showEditPhotoForm: () => console.log("showEditPhotoForm"),
  isEditableActivePhoto: false,
  downloadOriginalPhotoUrl: "http://download.photo.url",
};

export const Loading = Template.bind({});

Loading.args = {
  activeIndex: 0,
  increaseIndex: () => console.log("increaseIndex"),
  decreaseIndex: () => console.log("decreaseIndex"),
  isEditingActivePhoto: false,
  photos: undefined,
  loading: true,
  hasNextPage: false,
  error: false,
  loadMorePhotos: () => console.log("loadMorePhotos"),
  onClose: () => console.log("onClose"),
  onToggleDesc: () => console.log("onToggleDesc"),
  showEditPhotoForm: () => console.log("showEditPhotoForm"),
  isEditableActivePhoto: false,
  downloadOriginalPhotoUrl: "http://download.photo.url",
};

export const Error = Template.bind({});

Error.args = {
  activeIndex: 0,
  increaseIndex: () => console.log("increaseIndex"),
  decreaseIndex: () => console.log("decreaseIndex"),
  isEditingActivePhoto: false,
  photos: undefined,
  loading: false,
  hasNextPage: false,
  error: true,
  loadMorePhotos: () => console.log("loadMorePhotos"),
  onClose: () => console.log("onClose"),
  onToggleDesc: () => console.log("onToggleDesc"),
  showEditPhotoForm: () => console.log("showEditPhotoForm"),
  isEditableActivePhoto: false,
  downloadOriginalPhotoUrl: "http://download.photo.url",
};
