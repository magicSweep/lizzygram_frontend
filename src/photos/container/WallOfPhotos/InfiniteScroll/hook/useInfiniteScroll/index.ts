import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  MutableRefObject,
} from "react";
import {
  calcContainerWidth,
  calcItemsWrapperHeight,
  calcNumberOfItemsByFlex,
  calcNumberOfItemsByWidth,
  getItemsArrays,
} from "./helper";

export const calcPages = (
  itemsLength: number,
  numberOfItemsByFlex: number,
  hasNextPage: boolean
) => {
  if (itemsLength === 0) return 0;

  let pages = Math.ceil(itemsLength / numberOfItemsByFlex);

  if (itemsLength % numberOfItemsByFlex === 0) {
    if (hasNextPage === true) return pages + 1;
  }

  return pages;
};

const calcStateSizes = (
  numberOfItemsPerPage: number,
  cardWidth: number,
  cardHeight: number
) => {
  const containerWidth = calcContainerWidth();

  console.log("RESIZE", document.body.clientWidth, containerWidth);

  //const cardWidth = 200 + 8;

  //const cardHeight = 150 + 8;

  const numberOfItemsByWidth = calcNumberOfItemsByWidth(
    containerWidth,
    cardWidth
  );

  console.log("numberOfItemsByWidth", numberOfItemsByWidth);

  return {
    itemsWrapperHeight: calcItemsWrapperHeight(
      numberOfItemsByWidth,
      numberOfItemsPerPage,
      cardHeight
    ),
    containerWidth,
    numberOfItemsByFlex: calcNumberOfItemsByFlex(
      numberOfItemsByWidth,
      numberOfItemsPerPage
    ),
  };
};

let init = false;

// This hook is responsble for creating blocks with round number of items in it
// It is calculate size of block, number of blocks, number of items in each block
// and it get initial items array and make from it array of arrays by blocks
// (Each block has an index with wich we can determine is this block in viewport or not )
export const useInfiniteScroll = (
  items: any[],
  numberOfItemsPerPage: number,
  cardWidth: number,
  cardHeight: number,
  resize: number,
  hasNextPage: boolean,
  numberOfAddedPhotos: number
) => {
  const [state, setState] = useState(() => {
    if (typeof window === "undefined") {
      return {
        itemsWrapperHeight: 0,
        containerWidth: 0,
        numberOfItemsByFlex: 0,
      };
    }

    return calcStateSizes(numberOfItemsPerPage, cardWidth, cardHeight);
  });

  // DO WE NEED LOAD MORE PHOTOS
  // if(photosLength - numberOfItemsByFlex * index) < numberOfItemsByFlex && we have next page

  const itemsLength =
    items === null || items === undefined
      ? numberOfAddedPhotos
      : items.length + numberOfAddedPhotos;

  const pages = calcPages(itemsLength, state.numberOfItemsByFlex, hasNextPage);

  const itemsArrays =
    items === null || items === undefined
      ? []
      : getItemsArrays(
          items,
          pages,
          state.numberOfItemsByFlex,
          numberOfAddedPhotos
        );

  useEffect(() => {
    if (init === false) {
      init = true;
      return;
    }

    const containerWidth = calcContainerWidth();

    //console.log("RESIZE", document.body.clientWidth, containerWidth);

    setState(calcStateSizes(numberOfItemsPerPage, cardWidth, cardHeight));
  }, [resize]);

  return {
    ...state,
    itemsArrays,
    pages,
  };
};
