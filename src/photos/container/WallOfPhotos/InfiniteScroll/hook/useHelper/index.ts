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
  numberOfItemsByPage: number,
  hasNextPage: boolean
) => {
  if (itemsLength === 0) return 0;

  let numberOfPages = Math.ceil(itemsLength / numberOfItemsByPage);

  if (itemsLength % numberOfItemsByPage === 0) {
    if (hasNextPage === true) return numberOfPages + 1;
  }

  return numberOfPages;
};

const calcStateSizes = (
  numberOfItemsPerQuery: number,
  cardWidth: number,
  cardHeight: number
) => {
  const containerWidth = calcContainerWidth();

  //console.log("RESIZE", document.body.clientWidth, containerWidth);

  //const cardWidth = 200 + 8;

  //const cardHeight = 150 + 8;

  const numberOfItemsByWidth = calcNumberOfItemsByWidth(
    containerWidth,
    cardWidth
  );

  //console.log("---------------numberOfItemsByWidth", numberOfItemsByWidth);
  //console.log("---------------containerWidth", containerWidth, cardWidth);

  return {
    itemsWrapperHeight: calcItemsWrapperHeight(
      numberOfItemsByWidth,
      numberOfItemsPerQuery,
      cardHeight
    ),
    containerWidth,
    numberOfItemsByPage: calcNumberOfItemsByFlex(
      numberOfItemsByWidth,
      numberOfItemsPerQuery
    ),
  };
};

let init = false;

// This hook is responsble for creating blocks with round number of items in each
// It is calculate size of block, number of blocks, number of items in each block
// and it get initial items array and make from it array of arrays by blocks
// (Each block has an index with wich we can determine is this block in viewport or not )
export const useHelper = (
  items: any[],
  numberOfItemsPerQuery: number,
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
        numberOfItemsByPage: 0,
      };
    }

    return calcStateSizes(numberOfItemsPerQuery, cardWidth, cardHeight);
  });

  // DO WE NEED LOAD MORE PHOTOS
  // if(photosLength - numberOfItemsByFlex * index) < numberOfItemsByFlex && we have next page

  const itemsLength =
    items === null || items === undefined
      ? numberOfAddedPhotos
      : items.length + numberOfAddedPhotos;

  const numberOfPages = calcPages(
    itemsLength,
    state.numberOfItemsByPage,
    hasNextPage
  );

  const itemsArrays =
    items === null || items === undefined
      ? undefined
      : getItemsArrays(
          items,
          numberOfPages,
          state.numberOfItemsByPage,
          numberOfAddedPhotos
        );

  useEffect(() => {
    if (init === false) {
      init = true;
      return;
    }

    //const containerWidth = calcContainerWidth();

    //console.log("RESIZE", document.body.clientWidth, containerWidth);

    setState(calcStateSizes(numberOfItemsPerQuery, cardWidth, cardHeight));
  }, [resize]);

  return {
    ...state,
    itemsArrays,
    numberOfPages,
  };
};
