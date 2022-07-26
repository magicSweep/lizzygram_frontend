import React, { useState, useEffect } from "react";
import { calc, doesNeedCalc } from "./Blocks.service";

const initState = {
  blockHeight: 0,
  numberOfItemsInBlock: 0,
  numberOfBlocks: 0,
  //prevNumberOfBlocks: 0,
};

// TODO: Calc numberOfBlocks if items === undefined and loading === true

let prevItems: any;

// This hook is responsible for calc blocks with round number of items in each
// It is calculate height of block, number of blocks, number of items in each block
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

  //console.log("useBlocks", blockWidth, items, prevItems === items);

  useEffect(() => {
    prevItems = items;
  });

  useEffect(() => {
    if (doesNeedCalc(blockWidth) === false) return;

    /* console.log(
      "REcalc useBlocks",
      calcStateValues(
        items,
        numberOfItemsPerQuery,
        blockWidth,
        itemWidth,
        itemHeight,
        numberOfAddedItems,
        hasNextPage
      )
    ); */

    setState((prevState) => ({
      prevNumberOfBlocks: prevState.numberOfBlocks,
      ...calc(
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
