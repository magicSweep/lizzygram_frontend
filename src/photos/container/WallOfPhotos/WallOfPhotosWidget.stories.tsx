import WallOfPhotosWidget, { WallOfPhotosProps } from "./WallOfPhotosWidget";
import { photos, addedPhoto } from "./../../mock/fake.data";
//import useFakePhotos from "../../mock/useFakePhotos";
//import { getItemsArrays } from "./InfiniteScroll/hook/useHelper/helper";
import { Story } from "@storybook/react";

export default {
  component: WallOfPhotosWidget,
  title: "Photos/WallOfPhotos/Widget",
};

/*  
  activeObservableIndex: number;
  photos: Photo<FirestoreDate>[][] | undefined;
  loadMorePhotos: () => void;
  reLoadPhotos: () => void;
  hasNextPage: boolean;
  loading: boolean;
  editedPhotoIds: string[];
  numberOfAddedPhotos: number;
  isError: boolean;
  isSearch: boolean;
  showPhotoSlider: (event: any) => void;
  showEditPhotoForm: () => void;
  userUID: string;
  numberOfPhotosPerQuery: number | undefined;
  isShowPhotoSlider: boolean;

  pageHeight: number;
  numberOfPages: number;
  numberOfPhotosByPage: number;
 */

const props = {
  activeObservableIndex: 0,
  photos: undefined,
  loadMorePhotos: () => console.log("loadMorePhotos"),
  reLoadPhotos: () => console.log("reLoadPhotos"),
  showEditPhotoForm: () => console.log("showEditPhotoForm"),
  showPhotoSlider: () => console.log("showPhotoSlider"),
  //numberOfPhotosPerQuery: 4,
  userUID: "mdFrANbtA4bBEjFsvWWbSOPdfLB2",
  hasNextPage: true,
  loading: true,
  editedPhotoIds: [],
  numberOfAddedPhotos: 0,
  isError: false,
  isSearch: false,
  //numberOfPhotosPerQuery: number | undefined;
  isShowPhotoSlider: false,

  pageHeight: 404,
  numberOfPages: 2,
  numberOfPhotosByPage: 4,
};

const Template: Story<WallOfPhotosProps> = (args) => (
  <WallOfPhotosWidget {...args} />
);

// initial load photos
export const InitLoadingPhotos = Template.bind({});
InitLoadingPhotos.args = {
  ...props,
  numberOfPages: 0,
};

// photos
export const RenderPhotos = Template.bind({});
RenderPhotos.args = {
  ...props,
  loading: false,
  photos: [[...photos.slice(0, 4)], [addedPhoto]],
};

// photos without next page
export const PhotosWithoutNextPage = Template.bind({});
PhotosWithoutNextPage.args = {
  ...props,
  hasNextPage: false,
  loading: false,
  photos: [[...photos.slice(0, 4)], [addedPhoto]],
};

// photos and load more photos
export const LoadMorePhotos = Template.bind({});
LoadMorePhotos.args = {
  ...props,
  photos: [[...photos.slice(0, 4)], [addedPhoto]],
};

// added photos
export const AddedPhotos = Template.bind({});
AddedPhotos.args = {
  ...props,
  hasNextPage: true,
  loading: false,
  photos: [[null, null, ...photos.slice(0, 2)], [addedPhoto]],
};

// ["232", "3309"]
// edited photos
export const EditedPhotos = Template.bind({});
EditedPhotos.args = {
  ...props,
  hasNextPage: true,
  loading: false,
  editedPhotoIds: ["232", "3309"],
  photos: [[...photos.slice(0, 4)], [addedPhoto]],
};

// no one photos
export const NoOnePhoto = Template.bind({});
NoOnePhoto.args = {
  ...props,
  hasNextPage: false,
  loading: false,
  photos: [],
};

export const NoOnePhotoOnSearch = Template.bind({});
NoOnePhotoOnSearch.args = {
  ...props,
  hasNextPage: false,
  loading: false,
  photos: [],
  isSearch: true,
};
// show photo slider
export const ShowPhotoSlider = Template.bind({});
ShowPhotoSlider.args = {
  ...props,
  isShowPhotoSlider: true,
  numberOfPages: 3,
  hasNextPage: true,
  loading: false,
  photos: [[...photos.slice(0, 4)], [...photos.slice(4, 8)], [addedPhoto]],
};
// error on photos loading
export const Error = Template.bind({});
Error.args = {
  ...props,
  hasNextPage: true,
  loading: false,
  isError: true,
};

/* import Box from "@mui/system/Box";
import Button from "@mui/material/Button";
import WallOfPhotosWidget from "./WallOfPhotosWidget";
import { useState } from "react";
import { photos } from "./../../mock/fake.data";
import useFakePhotos from "../../mock/useFakePhotos";
import { getItemsArrays } from "./InfiniteScroll/hook/useHelper/helper";

export default {
  component: WallOfPhotosWidget,
  title: "Photos/WallOfPhotos/Widget",
};

const props = {
  loadMorePhotos: () => console.log("loadMorePhotos"),
  reLoadPhotos: () => console.log("reLoadPhotos"),
  showEditPhotoForm: () => console.log("showEditPhotoForm"),
  showPhotoSlider: () => console.log("showPhotoSlider"),
  //numberOfPhotosPerQuery: 4,
  userUID: "mdFrANbtA4bBEjFsvWWbSOPdfLB2",
};

export const Default = () => {
  const {
    photos,
    hasNextPage,
    loading,
    isError,
    loadPhotos,
    loadMorePhotos,
    loadNewPhotosState,
    loadPhotosWithError,
  } = useFakePhotos(5);

  const [state, setState] = useState({
    editedPhotoIds: [],
    numberOfAddedPhotos: 0,
    isSearch: false,
    isShowPhotoSlider: false,
    ///////
    pageHeight: 404,
    numberOfPhotosByPage: 4,
  });

  let numberOfPages =
    photos === undefined
      ? 0
      : Math.floor(photos.length / state.numberOfPhotosByPage);

  numberOfPages =
    numberOfPages !== 0 && hasNextPage === true
      ? numberOfPages + 1
      : numberOfPages;

  const activeObservableIndex = 1;

  const photosArrs =
    photos === undefined
      ? undefined
      : getItemsArrays(
          photos,
          numberOfPages,
          state.numberOfPhotosByPage,
          state.numberOfAddedPhotos
        );

  const toggleNumberOfAddedPhotos = () =>
    setState((state) =>
      state.numberOfAddedPhotos === 0
        ? { ...state, numberOfAddedPhotos: 2 }
        : { ...state, numberOfAddedPhotos: 0 }
    );

  const toggleEditedPhotoIds = () =>
    setState((state) =>
      state.editedPhotoIds.length === 0
        ? { ...state, editedPhotoIds: ["232", "3309"] }
        : { ...state, editedPhotoIds: [] }
    );

  const toggleIsSearch = () =>
    setState((state) => ({ ...state, isSearch: !state.isSearch }));

  const toggleIsShowPhotoSlider = () =>
    setState((state) => ({
      ...state,
      isShowPhotoSlider: !state.isShowPhotoSlider,
    }));

  return (
    <>
      <Box className="flex justify-center flex-wrap">
        <Button onClick={() => loadPhotos()}>load(load more) Photos</Button>
        <span> | </span>
        <Button onClick={loadNewPhotosState}>new photos state</Button>
        <span> | </span>
        <Button onClick={loadPhotosWithError}>load photos with error</Button>
        <span> | </span>
        <Button onClick={toggleNumberOfAddedPhotos}>
          toggle_Number_Of_Added_Photos
        </Button>
        <span> | </span>
        <Button onClick={toggleEditedPhotoIds}>toggle_Edited_PhotoIds</Button>
        <span> | </span>
        <Button onClick={toggleIsSearch}>toggle Is Search</Button>
        <span> | </span>
        <Button onClick={toggleIsShowPhotoSlider}>
          toggle Is Show Photo Slider
        </Button>
        <span> | </span>
      </Box>
      <Box width="640" margin="auto">
        <WallOfPhotosWidget
          numberOfPages={numberOfPages}
          activeObservableIndex={activeObservableIndex}
          photos={photosArrs}
          hasNextPage={hasNextPage}
          loading={loading}
          isError={isError}
          {...props}
          {...state}
        />
      </Box>
    </>
  );
};
 */
