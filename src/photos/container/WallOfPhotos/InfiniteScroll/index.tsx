import { Button } from "@mui/material";
import Box from "@mui/system/Box";
import React, { useState, useEffect, Fragment } from "react";
import { useInfiniteScroll } from "./hook/useInfiniteScroll";
import { useItems } from "./hook/useItems";
import { calcNumberOfItemsPerPage } from "./helper";
import Page from "./Page";

/* const cardwidth = 208;
const cardHeight = 158; */
const marginBottom = 8;
const marginLeft = 8;
const cardWidth = 300;
const cardHeight = 550;
//const numberOfItemsPerPage = calcNumberOfItemsPerPage(cardHeight, cardwidth);

const numberOfItemsPerQuery = 3;

const getItemsElements = (
  itemsArrays: any[][],
  visibleIndex: number,
  showSlider: boolean,
  itemsWrapperHeight: number,
  numberOfItemsByFlex: number,
  loading: boolean,
  hasNextPage: boolean,
  numberOfPages: number,
  cardWidth: number,
  cardHeight: number
) => {
  if (itemsArrays === undefined || itemsArrays.length === 0)
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
          isLast={index === numberOfPages - 1}
          cardWidth={cardWidth}
          cardHeight={cardHeight}
        />
      </Fragment>
    );
  });
};

const Test = () => {
  const [showSlider, setShowSlider] = useState(false);

  const {
    loading,
    items,
    fetch,
    hasNextPage,
    newState,
    newOnePageState,
    numberOfAddedPhotos,
    addOneItem,
  } = useItems(numberOfItemsPerQuery);

  const {
    visibleIndex,
    itemsArrays,
    numberOfPages,
    itemsWrapperHeight,
    containerWidth,
    numberOfItemsByPage,
  } = useInfiniteScroll(
    items,
    numberOfItemsPerQuery,
    cardWidth,
    cardHeight,
    marginLeft,
    marginBottom,
    hasNextPage,
    numberOfAddedPhotos,
    loading,
    fetch
  );

  const itemsElements = getItemsElements(
    itemsArrays,
    visibleIndex,
    showSlider,
    itemsWrapperHeight,
    numberOfItemsByPage,
    loading,
    hasNextPage,
    numberOfPages,
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
          isLast={index === numberOfPages - 1}
        />
      </Fragment>
    );
  }); */

  console.log(
    "RENDER TEST",
    itemsArrays,
    //numberOfPages,
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
