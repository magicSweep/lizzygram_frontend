import { Button } from "@mui/material";
import Box from "@mui/system/Box";
import React, { useState, useEffect, Fragment } from "react";
import { useInfiniteScroll } from "./hook/useInfiniteScroll";
import { useItems } from "./hook/useItems";
import { useWindowResize } from "./hook/useWindowResize";
import { useIntersection } from "./hook/useIntersection";
import { calcNumberOfItemsPerPage } from "./helper";
import Page from "./Page";

/* const cardwidth = 208;
const cardHeight = 158; */
const marginBottom = 8;
const marginLeft = 8;
const cardWidth = 300;
const cardHeight = 550;
//const numberOfItemsPerPage = calcNumberOfItemsPerPage(cardHeight, cardwidth);

const numberOfItemsPerPage = 3;

const getItemsElements = (
  itemsArrays: any[][],
  visibleIndex: number,
  showSlider: boolean,
  itemsWrapperHeight: number,
  numberOfItemsByFlex: number,
  loading: boolean,
  hasNextPage: boolean,
  pages: number,
  cardWidth: number,
  cardHeight: number
) => {
  if (itemsArrays.length === 0)
    return (
      <Fragment key={`wrapper_123qewq`}>
        <Page
          items={[]}
          index={21}
          visibleIndex={21}
          //wrapperRef={itemsWrapperRef}
          isShowSlider={showSlider}
          height={itemsWrapperHeight}
          numberOfItemsByFlex={numberOfItemsByFlex}
          loading={loading}
          hasNextPage={hasNextPage}
          isLast={true}
          cardWidth={cardWidth}
          cardHeight={cardHeight}
        />
      </Fragment>
    );

  return itemsArrays.map((arr, index) => {
    return (
      <Fragment key={`wrapper_${index}`}>
        <Page
          items={arr}
          index={index}
          visibleIndex={visibleIndex}
          //wrapperRef={itemsWrapperRef}
          isShowSlider={showSlider}
          height={itemsWrapperHeight}
          numberOfItemsByFlex={numberOfItemsByFlex}
          loading={loading}
          hasNextPage={hasNextPage}
          isLast={index === pages - 1}
          cardWidth={cardWidth}
          cardHeight={cardHeight}
        />
      </Fragment>
    );
  });
};

const Test = () => {
  const [showSlider, setShowSlider] = useState(false);

  const resize = useWindowResize();

  const {
    loading,
    items,
    fetch,
    hasNextPage,
    newState,
    newOnePageState,
    numberOfAddedPhotos,
    addOneItem,
  } = useItems(numberOfItemsPerPage);

  //const itemsLength = items === null || items === undefined ? numberOfAddedPhotos : items.length + numberOfAddedPhotos;

  /* const [visibleIndex, setVisibleIndex] = useState(0);

  const increaseVisibleIndex = () => setVisibleIndex((index) => index + 1);

  const decreaseVisibleIndex = () =>
    setVisibleIndex((index) => (index > 0 ? index - 1 : 0)); */

  const {
    itemsArrays,
    pages,
    itemsWrapperHeight,
    containerWidth,
    numberOfItemsByFlex,
  } = useInfiniteScroll(
    items,
    numberOfItemsPerPage,
    cardWidth + marginLeft,
    cardHeight + marginBottom,
    resize,
    hasNextPage,
    numberOfAddedPhotos
  );

  const { observerIndex: visibleIndex } = useIntersection(
    items,
    pages,
    hasNextPage,
    loading,
    fetch
  );

  const itemsElements = getItemsElements(
    itemsArrays,
    visibleIndex,
    showSlider,
    itemsWrapperHeight,
    numberOfItemsByFlex,
    loading,
    hasNextPage,
    pages,
    cardWidth,
    cardHeight
  );

  /*  itemsArrays.map((arr, index) => {
    return (
      <Fragment key={`wrapper_${index}`}>
        <Page
          items={arr}
          index={index}
          visibleIndex={visibleIndex}
          //wrapperRef={itemsWrapperRef}
          isShowSlider={showSlider}
          height={itemsWrapperHeight}
          numberOfItemsByFlex={numberOfItemsByFlex}
          loading={loading}
          hasNextPage={hasNextPage}
          isLast={index === pages - 1}
        />
      </Fragment>
    );
  }); */

  console.log(
    "RENDER TEST",
    itemsArrays,
    //pages,
    //hasNextPage,
    //numberOfItemsPerPage,
    //itemsWrapperHeight,
    //containerWidth,
    //numberOfItemsByFlex,
    visibleIndex
  );

  return (
    <Box
      //ref={containerRef}
      width={containerWidth}
      className="flex justify-around flex-wrap m-auto pt-12 bg-green-200"
    >
      {itemsElements}

      <div className="fixed top-12 right-24 bg-black px-4 py-2 rounded shadow">
        <Button
          variant="contained"
          size="small"
          onClick={() => setShowSlider((show) => !show)}
        >
          toggle slider
        </Button>
        <span> | </span>
        <Button variant="contained" size="small" onClick={newState}>
          new state
        </Button>
        <span> | </span>
        <Button variant="contained" size="small" onClick={newOnePageState}>
          new One Page State
        </Button>
        <span> | </span>
        <Button variant="contained" size="small" onClick={addOneItem}>
          add one item
        </Button>
        <span> | </span>
      </div>
    </Box>
  );
};

export default Test;
