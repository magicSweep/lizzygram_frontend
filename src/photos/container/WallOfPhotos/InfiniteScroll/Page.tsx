import Box from "@mui/system/Box";
import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  MutableRefObject,
} from "react";

const getDoesRenderElements = (
  index: number,
  visibleIndex: number,
  hasNextPage: boolean,
  isLast: boolean,
  loading: boolean,
  isShowSlider: boolean
) => {
  if (isShowSlider === true) return false;

  const isVisible =
    index === visibleIndex ||
    index === visibleIndex - 1 ||
    index === visibleIndex + 1;

  if (isVisible === false) return false;

  if (isLast === true && hasNextPage === true && loading === false)
    return false;

  return true;
};

const getElements = (
  items: any[],
  doesRenderElements: boolean,
  isLast: boolean,
  loading: boolean,
  numberOfItemsByFlex: number,
  width: number,
  height: number
  //numberOfAddedPhotos: number,
  //index: number
) => {
  if (doesRenderElements === false) return null;

  if (isLast === true && loading === true) {
    // @ts-ignore
    return [...Array(numberOfItemsByFlex).keys()].map((val, i) => {
      return (
        <Box
          key={`item_skeleton_${val}_ ${i}`}
          width={width}
          height={height}
          className="mb-2 ml-2 bg-gray-300"
        >
          {`skeleton_${i}`}
        </Box>
      );
    });
  }

  return items.map((val, i) => {
    if (val === null) {
      return (
        <Box
          key={`item_add_skeleton_ ${i}`}
          width={width}
          height={height}
          className="mb-2 ml-2 bg-gray-300"
        >
          {`skeleton_${i}`}
        </Box>
      );
    }

    return (
      <Box
        key={`item_${val}_ ${i}`}
        onClick={() => console.log("On item click")}
        width={width}
        height={height}
        className="mb-2 ml-2 bg-secondary"
      >
        {val}
      </Box>
    );
  });
};

const Page = ({
  items,
  index,
  visibleIndex,
  isShowSlider,
  //wrapperRef,
  height,
  numberOfItemsByFlex,
  loading,
  hasNextPage,
  isLast,
  cardWidth,
  cardHeight,
}: //numberOfAddedPhotos,
any) => {
  //const isVisible = true;
  const doesRenderElements = getDoesRenderElements(
    index,
    visibleIndex,
    hasNextPage,
    isLast,
    loading,
    isShowSlider
  );

  //const fHeight = items.length > numberOfItemsByFlex / 2 ? height : height / 2;

  const elements = getElements(
    items,
    doesRenderElements,
    isLast,
    loading,
    numberOfItemsByFlex,
    cardWidth,
    cardHeight
    //numberOfAddedPhotos,
    //index
  );

  console.log("[RENDER PAGE]", items, doesRenderElements, isLast, loading);

  return (
    <Box
      height={isLast === true ? "auto" : height}
      id={`OBSERVER_TARGET__${index}`}
      data-observer-index={`${index}`}
      className="flex justify-around flex-wrap w-full bg-blue-200 opacity-80"
    >
      {elements}
    </Box>
  );
};

export default Page;
