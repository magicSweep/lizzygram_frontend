import React, { useState, useEffect } from "react";
/*import {
 calcContainerWidth,
  calcItemsWrapperHeight,
  calcNumberOfItemsByFlex,
  calcNumberOfItemsByWidth, 
  getArraysOfItemsByBlocks,
} from "./helper";*/

const calcNumberOfBlocks = (
  itemsLength: number,
  numberOfItemsByBlock: number,
  hasNextPage: boolean
) => {
  let numberOfBlocks = Math.ceil(itemsLength / numberOfItemsByBlock);

  if (itemsLength % numberOfItemsByBlock === 0) {
    if (hasNextPage === true) return numberOfBlocks + 1;
  }

  return numberOfBlocks;
};

const calcNumberOfItemsInRow = (containerWidth: number, itemWidth: number) => {
  if (containerWidth === 0) return 0;

  let numberOfItemsInRow = Math.floor(containerWidth / itemWidth);

  return numberOfItemsInRow === 0 ? 1 : numberOfItemsInRow;
};

const calcNumberOfItemsInBlock = (
  numberOfItemsPerQuery: number,
  numberOfItemsInRow: number
) => {
  return (
    Math.floor(numberOfItemsPerQuery / numberOfItemsInRow) * numberOfItemsInRow
  );
};

const calcBlockHeight = (
  numberOfItemsInBlock: number,
  numberOfItemsInRow: number,
  itemHeight: number
) => {
  return Math.ceil(numberOfItemsInBlock / numberOfItemsInRow) * itemHeight;
};

const calcStateValues = (
  items: any[] | undefined,
  numberOfItemsPerQuery: number,
  containerWidth: number,
  itemWidth: number,
  itemHeight: number,
  numberOfAddedItems: number,
  hasNextPage: boolean
) => {
  const numberOfItemsInRow = calcNumberOfItemsInRow(containerWidth, itemWidth);

  /*   alert(
    `numberOfItemsInRow | ${numberOfItemsInRow} | ${containerWidth} | ${itemWidth}`
  );
 */
  const numberOfItemsInBlock = calcNumberOfItemsInBlock(
    numberOfItemsPerQuery,
    numberOfItemsInRow
  );

  /*  alert(
    `numberOfItemsInBlock | ${numberOfItemsInBlock} | ${numberOfItemsPerQuery} | ${numberOfItemsInRow}`
  ); */

  const blockHeight = calcBlockHeight(
    numberOfItemsInBlock,
    numberOfItemsInRow,
    itemHeight
  );

  /*  alert(
    `blockHeight | ${blockHeight} | ${itemHeight} | ${numberOfItemsInBlock} | ${numberOfItemsInRow}`
  );
 */
  const itemsLength =
    items === null || items === undefined
      ? numberOfAddedItems
      : items.length + numberOfAddedItems;

  const numberOfBlocks =
    itemsLength === 0 || numberOfItemsInBlock === 0
      ? 0
      : calcNumberOfBlocks(itemsLength, numberOfItemsInBlock, hasNextPage);

  return {
    blockHeight,
    numberOfItemsInBlock,
    numberOfBlocks,
  };
};

const doesNeedCalc = (blockWidth: number) => {
  return typeof blockWidth === "number" && blockWidth > 0;
};

const initState = {
  blockHeight: 0,
  numberOfItemsInBlock: 0,
  numberOfBlocks: 0,
  prevNumberOfBlocks: 0,
};

// TODO: Calc numberOfBlocks if items === undefined and loading === true

// This hook is responsible for calc blocks with round number of items in each
// It is calculate size of block, number of blocks, number of items in each block
export const useBlocks = (
  items: any[] | undefined,
  numberOfItemsPerQuery: number,
  //itemRef: MutableRefObject<HTMLDivElement>,
  itemWidth: number,
  itemHeight: number,
  blockWidth: number,
  hasNextPage: boolean,
  numberOfAddedItems: number
) => {
  const [state, setState] = useState(initState);

  useEffect(() => {
    if (doesNeedCalc(blockWidth) === false) return;

    setState((prevState) => ({
      prevNumberOfBlocks: prevState.numberOfBlocks,
      ...calcStateValues(
        items,
        numberOfItemsPerQuery,
        blockWidth,
        itemWidth,
        itemHeight,
        numberOfAddedItems,
        hasNextPage
      ),
    }));
  }, [blockWidth, items, numberOfAddedItems, hasNextPage]);

  //console.log("---------BOOM - 1", containerWidth);
  /* 
  if (typeof blockWidth !== "number" || blockWidth <= 0)
    return {
      ...state,
      arrayOfBlocksWithItems: undefined,
      numberOfBlocks: 0,
    };

  //console.log("---------BOOM - 2", containerWidth);

  const itemsLength =
    items === null || items === undefined
      ? numberOfAddedItems
      : items.length + numberOfAddedItems;

  const numberOfBlocks = calcNumberOfBlocks(
    itemsLength,
    state.numberOfItemsInBlock,
    hasNextPage
  );

 console.log(
    "---------arraysOfItemsByBlocks",
    items,
    numberOfBlocks,
    state.numberOfItemsInBlock,
    numberOfAddedItems
  ); 

  const arrayOfBlocksWithItems =
    items === null || items === undefined
      ? undefined
      : getArraysOfItemsByBlocks(
          items,
          numberOfBlocks,
          state.numberOfItemsInBlock,
          numberOfAddedItems
        );*/

  return state;
};
