import {
  useRef,
  useEffect,
  MutableRefObject,
  Fragment,
  useCallback,
} from "react";
import Box from "@mui/system/Box";
import Button from "@mui/material/Button";
import WallOfPhotosWidget from "./WallOfPhotosWidget";
import { useState } from "react";
import { photos } from "./../../mock/fake.data";

export default {
  component: WallOfPhotosWidget,
  title: "Photos/WallOfPhotos/Widget",
};

/*  indexObservable: number;
  photos: Photo<FirestoreDate>[] | undefined;
  loadMorePhotos: () => void;
  reLoadPhotos: () => void;
  hasNextPage: boolean;
  loading: boolean;
  //addPhotoLoading: boolean;
  // requests - photos that is changing at this time
  editedPhotoIds: string[];
  // requests - photos that been added at this time
  numberOfAddedPhotos: number;
  error: boolean;
  isSearch: boolean;
  showPhotoSlider: (event: any) => void;
  showEditPhotoForm: () => void;
  //showPhotoDesc: (photo: TPhotoData) => void;
  userUID: string;
  numberOfPhotosPerQuery: number | undefined;
  isShowPhotoSlider: boolean; */

const props = {
  loadMorePhotos: () => console.log("loadMorePhotos"),
  reLoadPhotos: () => console.log("reLoadPhotos"),
  showEditPhotoForm: () => console.log("showEditPhotoForm"),
  showPhotoSlider: () => console.log("showPhotoSlider"),
  numberOfPhotosPerQuery: 4,
  userUID: "mdFrANbtA4bBEjFsvWWbSOPdfLB2",
  indexObservable: 1,
};

export const Default = () => {
  const [state, setState] = useState({
    photos: undefined,
    hasNextPage: false,
    loading: true,
    editedPhotoIds: [],
    numberOfAddedPhotos: 0,
    error: false,
    isSearch: false,
    isShowPhotoSlider: false,
  });

  const togglePhotos = () =>
    setState((state) =>
      state.photos === undefined || state.photos.length === 0
        ? { ...state, photos: photos }
        : { ...state, photos: [] }
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

  const toggleHasNextPage = () =>
    setState((state) => ({ ...state, hasNextPage: !state.hasNextPage }));

  const toggleError = () =>
    setState((state) => ({ ...state, error: !state.error }));

  const toggleLoading = () =>
    setState((state) => ({ ...state, loading: !state.loading }));

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
        <Button onClick={togglePhotos}>toggle_Photos</Button>
        <span> | </span>
        <Button onClick={toggleNumberOfAddedPhotos}>
          toggle_Number_Of_Added_Photos
        </Button>
        <span> | </span>
        <Button onClick={toggleEditedPhotoIds}>toggle_Edited_PhotoIds</Button>
        <span> | </span>
        <Button onClick={toggleHasNextPage}>toggle Has Next Page</Button>
        <span> | </span>
        <Button onClick={toggleError}>toggle Error</Button>
        <span> | </span>
        <Button onClick={toggleLoading}>toggle Loading</Button>
        <span> | </span>
        <Button onClick={toggleIsSearch}>toggle Is Search</Button>
        <span> | </span>
        <Button onClick={toggleIsShowPhotoSlider}>
          toggle Is Show Photo Slider
        </Button>
        <span> | </span>
      </Box>
      <WallOfPhotosWidget {...props} {...state} />
    </>
  );
};

/* export const Test = () => {
  const items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];
  const numberOfPhotosPerQuery = 6;
  const photosLength = 14;
  const itemsMargin = 8;

  const firstItemRef: MutableRefObject<HTMLElement> = useRef(null);
  const lastItemRef: MutableRefObject<HTMLElement> = useRef(null);

  const [position, setPosition] = useState({
    top: -1,
    height: 0,
    bottom: -1,
  });

  useEffect(() => {
    console.log("firstItemRef", firstItemRef);
    console.log("lastItemRef", lastItemRef);

    const top = firstItemRef.current.getBoundingClientRect().top;
    const bottom = lastItemRef.current.getBoundingClientRect().bottom;

    console.log("position", top, bottom);

    setPosition({
      top: top + window.scrollX,
      height: bottom - top,
      bottom: bottom + window.scrollY,
    });
  }, []);

  const itemsElements = items.map((val, i) => {
    return (
      <Box
        key={`${val}_ ${i}`}
        onClick={() => console.log("On item click")}
        ref={
          i === 0
            ? firstItemRef
            : i === numberOfPhotosPerQuery - 1
            ? lastItemRef
            : undefined
        }
        width="200px"
        height="150px"
        className="mb-2 ml-2 bg-secondary"
      >
        {val}
      </Box>
    );
  });

  return (
    <Box className="relative flex justify-around flex-wrap w-5/6 m-auto pt-12 bg-green-200">
      {position.top !== -1 && (
        <Box
          onClick={() => console.log("On ABS click")}
          className="absolute w-full bg-blue-100 opacity-50"
          top={position.top - 16}
          height={position.height}
          //bottom={position.bottom}
        ></Box>
      )}
      {itemsElements}
    </Box>
  );
};
 */

/* 
const Page = ({
  items,
  index,
  visibleIndex,
  //wrapperRef,
  height,
  numberOfItemsByFlex,
}: any) => {
  //const isVisible = true;
  const isVisible =
    index === visibleIndex ||
    index === visibleIndex - 1 ||
    index === visibleIndex + 1;

  const fHeight = items.length > numberOfItemsByFlex / 2 ? height : height / 2;

  const elements =
    // @ts-ignore
    isVisible === false
      ? null
      : items.map((val, i) => {
          return (
            <Box
              key={`item_${val}_ ${i}_${index}`}
              onClick={() => console.log("On item click")}
              width="200px"
              height="150px"
              className="mb-2 ml-2 bg-secondary"
            >
              {val}
            </Box>
          );
        });

  return (
    <Box
      height={fHeight}
      className="flex justify-around flex-wrap w-full bg-blue-200 opacity-80"
    >
      {elements}
    </Box>
  );
};

export const Test = () => {
  const resize = useWindowResize();

  const items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];

  const numberOfPhotosPerQuery = 4;
  const photosLength = items.length;

  const visibleIndex = 2;

  //const itemsWrapperRef: MutableRefObject<HTMLElement> = useRef(null);
  //const containerRef: MutableRefObject<HTMLElement> = useRef(null);

  const [state, setState] = useState({
    height: 0,
    containerWidth: 0,
    numberOfItemsByFlex: 0,
  });

  // DO WE NEED LOAD MORE PHOTOS
  // if(photosLength - numberOfItemsByFlex * index) < numberOfItemsByFlex && we have next page

  //if (state.numberOfItemsByFlex === 0) return null;

  const pages = Math.ceil(photosLength / state.numberOfItemsByFlex);

  const itemsArrays = [];

  if (state.numberOfItemsByFlex !== 0) {
    for (let y = 0; y < pages; y++) {
      itemsArrays[y] = items.slice(
        y * state.numberOfItemsByFlex,
        state.numberOfItemsByFlex * (y + 1)
      );
    }
  }

  useEffect(() => {
    //const containerRect = containerRef.current.getBoundingClientRect();

    //console.log("containerRef", containerRect);

    const containerWidth = Math.round(document.body.clientWidth * 0.8);

    console.log("RESIZE", document.body.clientWidth, containerWidth);

    const cardWidth = 200 + 8;

    const cardHeight = 150 + 8;

    const numberOfItemsByWidth = Math.floor(containerWidth / cardWidth);

    const numberOfItemsByHeight = Math.floor(
      numberOfPhotosPerQuery / numberOfItemsByWidth
    );

    const numberOfItemsByFlex =
      Math.floor(numberOfPhotosPerQuery / numberOfItemsByWidth) *
      numberOfItemsByWidth;

    const height = numberOfItemsByHeight * cardHeight;

    /* const height =
      itemsWrapperRef.current === null
        ? 0
        : itemsWrapperRef.current.getBoundingClientRect().height; 

    console.log("numberOfItemsByWidth", numberOfItemsByWidth);

    setState({
      height,
      containerWidth,
      numberOfItemsByFlex,
    });
  }, [resize]);

  const itemsElements = itemsArrays.map((arr, index) => {
    return (
      <Fragment key={`wrapper_${index}`}>
        <Page
          items={arr}
          index={index}
          visibleIndex={visibleIndex}
          //wrapperRef={itemsWrapperRef}
          height={state.height}
          numberOfItemsByFlex={state.numberOfItemsByFlex}
        />
      </Fragment>
    );
  });

  console.log("RENDER TEST", state);

  return (
    <Box
      //ref={containerRef}
      width={state.containerWidth}
      className="flex justify-around flex-wrap m-auto pt-12 bg-green-200"
    >
      {itemsElements}
    </Box>
  );
}; */
