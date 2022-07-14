import { useEffect, useRef } from "react";
import { useBlocksObserver } from "../useBlocksObserver";
import { useRewidthElement } from "./../useRewidthElement";
import { useNumberOfBlocksChange } from "../useNumberOfBlocksChange";
import { useBlocks } from "./../useBlocks";

// FIRST WE CALC BLOCKS WITH ROUND NUMBER OF ITEMS IN EACH
// WHEN WE USE INTERSECTION OBSERVER TO KNOW WHICH BLOCK IS CURRENTLY DISPLAYED ON THE SCREEN
export const useInfiniteScroll = (
  items: any[] | undefined,
  numberOfItemsPerQuery: number,
  cardWidth: number,
  cardHeight: number,
  hasNextPage: boolean,
  numberOfAddedItems: number,
  loading: boolean,
  loadMore: () => any
) => {
  const containerRef: any = useRef();

  // Watch on blocks width
  const containerWidth = useRewidthElement(containerRef);

  // Calc number of blocks with round number of items in each
  const { numberOfBlocks, blockHeight, numberOfItemsInBlock } = useBlocks(
    items,
    numberOfItemsPerQuery,
    cardWidth,
    cardHeight,
    //containerWidth,
    containerWidth,
    //hasNextPage,
    hasNextPage,
    //numberOfAddedItems
    numberOfAddedItems
  );

  console.log(
    "============useBlocks",
    numberOfBlocks,
    blockHeight,
    numberOfItemsInBlock
  );

  // What block is visible on the screen now
  const {
    visibleIndex: visibleBlockIndex,
    prevVisibleIndex: prevVisibleBlockIndex,
    ...observer
  } = useBlocksObserver();

  console.log("============useBlocksObserver", visibleBlockIndex);

  useNumberOfBlocksChange(numberOfBlocks, observer);

  // LOAD MORE ITEMS IF NEEDED
  useEffect(() => {
    if (visibleBlockIndex === numberOfBlocks - 1 && hasNextPage === true) {
      if (loadMore !== undefined && loading === false) loadMore();
    }
  }, [visibleBlockIndex]);

  /* alert(`
    visibleBlockIndex - ${visibleBlockIndex}
    numberOfBlocks - ${numberOfBlocks}
    blockHeight - ${blockHeight}
    numberOfItemsInBlock - ${numberOfItemsInBlock}
    containerWidth - ${containerWidth}
    numberOfItemsPerQuery - ${numberOfItemsPerQuery}
  `); */

  return {
    visibleBlockIndex,
    numberOfBlocks,
    blockHeight,
    numberOfItemsInBlock,
    containerRef,
  };
};
