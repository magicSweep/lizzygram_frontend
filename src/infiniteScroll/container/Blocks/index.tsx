import React, { cloneElement, FC } from "react";
import { getBlockHeight, getDoesRenderElements } from "./helper";
import { Box } from "@mui/system";

export type BlockProps = {
  //tagsState: ITagsState;
  loading: boolean;
  blockHeight: number;
  //numberOfPhotosInBlock: number;
  //blockIndex: number;
  //numberOfPhotosPerQuery: number;
  isShowPhotoSlider: boolean;
  activeObservableIndex: number;
  // numberOfItemsInBlock: number;
  //numberOfAddedItems: number;
  numberOfBlocks: number;
  hasNextPage: boolean;
  //isLast: boolean;
  //Cards: any;
};

/* 
  LAST PAGE AND HEIGHT: Cause we set height: "auto" to last page 
it cause a zero height when we scroll from last page to top. We decide 
do nothing with that.
*/
const Blocks: FC<BlockProps> = ({
  blockHeight,
  activeObservableIndex,
  hasNextPage,
  loading,
  isShowPhotoSlider,
  //numberOfAddedItems,
  //numberOfItemsInBlock,
  numberOfBlocks,
  children,
}) => {
  const numberOfBlocks_ =
    numberOfBlocks === 0 && loading === true
      ? numberOfBlocks + 1
      : numberOfBlocks;

  console.log("[RENDER BLOCKS]", numberOfBlocks_);

  const blocks = [...Array(numberOfBlocks_).keys()].map((v, blockIndex) => {
    const isLast = blockIndex === numberOfBlocks_ - 1;

    const cards = cloneElement(children as any, {
      isLast,
      blockIndex,
    });

    const doesRenderElements = getDoesRenderElements(
      blockIndex,
      activeObservableIndex,
      /*   hasNextPage,
      isLast,
      loading, */
      isShowPhotoSlider,
      blockHeight
    );

    const fBlockHeight = getBlockHeight(
      hasNextPage,
      isLast,
      loading,
      blockHeight
    );

    console.group("[RENDER BLOCK]");
    console.log("blockIndex", blockIndex);
    console.log("doesRenderElements", doesRenderElements);
    console.log("isLast", isLast);
    console.log("blockHeight", blockHeight);
    console.log("loading", loading);
    console.log("hasNextPage", hasNextPage);
    console.groupEnd();

    return (
      <Box
        height={fBlockHeight}
        id={`OBSERVER_TARGET__${blockIndex}`}
        key={`boom-${blockIndex}`}
        data-observer-index={`${blockIndex}`}
        className="flex justify-around flex-wrap w-full "
      >
        {doesRenderElements === true && cards}
      </Box>
    );
  });

  /* console.group("[RENDER PAGE]");
  console.log("doesRenderElements", doesRenderElements);
  console.log("isLast", props.isLast);
  console.log("loading", props.loading);
  console.log("photos", props.photos);
  console.groupEnd(); */

  return <>{blocks}</>;
};

export default Blocks;

/* import React, { FC } from "react";
import { getDoesRenderElements } from "./helper";
import { Box } from "@mui/system";

export type BlockProps = {
  //tagsState: ITagsState;
  loading: boolean;
  blockHeight: number;
  numberOfPhotosInBlock: number;
  blockIndex: number;
  //numberOfPhotosPerQuery: number;
  isShowPhotoSlider: boolean;
  activeObservableIndex: number;
  numberOfItemsInBlock: number;
  numberOfAddedItems: number;
  hasNextPage: boolean;
  isLast: boolean;
  Cards: any;
};

/* 
  LAST PAGE AND HEIGHT: Cause we set height: "auto" to last page 
it cause a zero height when we scroll from last page to top. We decide 
do nothing with that.
/
const Block: FC<BlockProps> = ({
  blockHeight,
  blockIndex,
  activeObservableIndex,
  hasNextPage,
  isLast,
  loading,
  isShowPhotoSlider,
  numberOfAddedItems,
  numberOfItemsInBlock,
  numberOfBlocks,
  Cards,
}) => {

  const blocks = [...Array(numberOfBlocks).keys()].map((v, i) => {
    
  })

  const doesRenderElements = getDoesRenderElements(
    blockIndex,
    activeObservableIndex,
    hasNextPage,
    isLast,
    loading,
    isShowPhotoSlider
  ); 

  /* console.group("[RENDER PAGE]");
  console.log("doesRenderElements", doesRenderElements);
  console.log("isLast", props.isLast);
  console.log("loading", props.loading);
  console.log("photos", props.photos);
  console.groupEnd(); /

  // TODO: Length of last block

  return (
    <Box
      height={isLast === true ? "auto" : blockHeight}
      id={`OBSERVER_TARGET__${blockIndex}`}
      data-observer-index={`${blockIndex}`}
      className="flex justify-around flex-wrap w-full "
    >
      {doesRenderElements === true && (
        <Cards
          isLast={isLast}
          numberOfItemsInBlock={numberOfItemsInBlock}
          blockIndex={blockIndex}
          numberOfAddedItems={numberOfAddedItems}
        />
      )}
    </Box>
  );
};

export default Block;
 */
