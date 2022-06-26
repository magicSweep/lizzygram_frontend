import { useEffect, useRef } from "react";
import { useObserveBlocks } from "../useObserveBlocks";
import { useResizeElement } from "./../../../hook/useResizeElement";
import { useBlocks } from "./../useBlocks";
import { onBlocksChange } from "./helper";

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

  const { width: containerWidth } = useResizeElement(containerRef);

  const {
    numberOfBlocks,
    prevNumberOfBlocks,
    blockHeight,
    numberOfItemsInBlock,
  } = useBlocks(
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

  const {
    observerIndex: visibleBlockIndex,
    prevObserverIndex: prevVisibleBlockIndex,
    ...observer
  } = useObserveBlocks();

  useEffect(() => {
    onBlocksChange(numberOfBlocks, prevNumberOfBlocks, observer);
  }, [numberOfBlocks]);

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
