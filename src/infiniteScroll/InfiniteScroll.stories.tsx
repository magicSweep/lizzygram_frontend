import { Box, Button } from "@mui/material";
import { Story } from "@storybook/react";
import React, { FC, useState, memo } from "react";
import Blocks from "./container/Blocks";
import { useInfiniteScroll } from "./hook/useInfiniteScroll";
import { useItems } from "./stories/hook/useItems";

export type CardsProps = {
  items: any[] | undefined;
  isLast?: boolean;
  loading: boolean;
  hasNextPage: boolean;
  numberOfItemsInBlock: number;
  numberOfAddedItems: number;
  blockIndex?: number;
};

function areCardsPropsEqual(prevProps, nextProps) {
  /*
  return true if passing nextProps to render would return
  the same result as passing prevProps to render,
  otherwise return false
  */

  return (
    prevProps.items === nextProps.items &&
    prevProps.isLast === nextProps.isLast &&
    prevProps.loading === nextProps.loading &&
    prevProps.blockIndex === nextProps.blockIndex &&
    prevProps.numberOfAddedItems === nextProps.numberOfAddedItems
  );
}

let count = 0;

const Cards: FC<CardsProps> = memo(
  ({
    items,
    isLast,
    loading,
    hasNextPage,
    numberOfItemsInBlock,
    blockIndex,
    numberOfAddedItems,
  }) => {
    let cards: any[] = [];

    count++;

    console.log("CARDS", count);

    // WE LOAD MORE ITEMS OR IT'S INITIAL ITEMS LOADING
    if ((isLast === true || items === undefined) && loading === true) {
      //console.log("getCards", numberOfItemsInBlock);
      cards = [...Array(numberOfItemsInBlock).keys()].map((val, i) => {
        return (
          <div key={`item_skeleton_${val}_ ${i}`} className="p-2">
            <Box
              width={`${cardWidth - 16}px`}
              height={`${cardHeight - 16}px`}
              className=" bg-gray-300"
            >
              {`skeleton_${i}`}
            </Box>
          </div>
        );
      });
    } else if (items === undefined) {
      console.error("ITEMS UNDEFINED");

      cards = null as any;
    } else {
      const items_ = (items as any[]).slice(
        (blockIndex as number) * numberOfItemsInBlock,
        ((blockIndex as number) + 1) * numberOfItemsInBlock
      );

      if (
        isLast === true &&
        hasNextPage === true &&
        items_.length < numberOfItemsInBlock
      )
        return null;

      cards = items_.map((val, i) => {
        const index = i + 1;

        if (numberOfAddedItems >= index * ((blockIndex as number) + 1)) {
          return (
            <div key={`item_add_skeleton_ ${i}`} className="p-2">
              <Box
                width={`${cardWidth - 16}px`}
                height={`${cardHeight - 16}px`}
                className="bg-gray-300"
              >
                {`skeleton_${i}`}
              </Box>
            </div>
          );
        }

        return (
          <div key={`item_${val}_ ${i}`} className="p-2">
            <Box
              onClick={() => console.log("On item click")}
              width={`${cardWidth - 16}px`}
              height={`${cardHeight - 16}px`}
              className="bg-secondary"
            >
              {val}
            </Box>
          </div>
        );
      });
    }

    return <>{cards}</>;
  },
  areCardsPropsEqual
);

export default {
  component: Cards,
  title: "InfiniteScroll/useInfiniteScroll",
};

const numberOfItemsPerQuery = 11;
const cardWidth = 280;
const cardHeight = 120;

function areEqual(prevProps, nextProps) {
  /*
  return true if passing nextProps to render would return
  the same result as passing prevProps to render,
  otherwise return false
  */

  return (
    prevProps.blockHeight === nextProps.blockHeight &&
    prevProps.visibleBlockIndex === nextProps.visibleBlockIndex &&
    prevProps.isShowPhotoSlider === nextProps.isShowPhotoSlider &&
    prevProps.items === nextProps.items &&
    prevProps.loading === nextProps.loading &&
    prevProps.numberOfBlocks === nextProps.numberOfBlocks &&
    prevProps.numberOfAddedPhotos === nextProps.numberOfAddedPhotos &&
    prevProps.numberOfItemsInBlock === nextProps.numberOfItemsInBlock
  );
}

const InfiniteScrollWidget = memo(
  ({
    blockHeight,
    visibleBlockIndex,
    hasNextPage,
    loading,
    isShowPhotoSlider,
    numberOfBlocks,
    numberOfAddedPhotos,
    numberOfItemsInBlock,
    items,
  }: any) => {
    return (
      <div className="m-auto w-9/12">
        <Blocks
          blockHeight={blockHeight}
          activeObservableIndex={visibleBlockIndex}
          hasNextPage={hasNextPage}
          loading={loading}
          isShowPhotoSlider={isShowPhotoSlider}
          numberOfBlocks={numberOfBlocks}
        >
          <Cards
            numberOfAddedItems={numberOfAddedPhotos}
            numberOfItemsInBlock={numberOfItemsInBlock}
            hasNextPage={hasNextPage}
            items={items}
            loading={loading}
          />
        </Blocks>
      </div>
    );
  },
  areEqual
);

export const Default = () => {
  const [isShowPhotoSlider, setShowSlider] = useState(false);

  const {
    loading,
    items,
    fetch: loadMore,
    hasNextPage,
    reset,
    newOnePageState,
    numberOfAddedPhotos,
    addOneItem,
  } = useItems(numberOfItemsPerQuery);

  const {
    visibleBlockIndex,
    numberOfBlocks,
    blockHeight,
    numberOfItemsInBlock,
    containerRef,
  } = useInfiniteScroll(
    items,
    numberOfItemsPerQuery,
    cardWidth,
    cardHeight,
    hasNextPage,
    numberOfAddedPhotos,
    loading,
    loadMore
  );

  console.log(
    "RENDER INFINITE SCROLL",
    numberOfBlocks,
    numberOfItemsInBlock,
    visibleBlockIndex
  );

  return (
    <>
      <div ref={containerRef} className="m-auto w-9/12 h-0"></div>
      {numberOfItemsInBlock !== 0 && (
        <InfiniteScrollWidget
          containerRef={containerRef}
          blockHeight={blockHeight}
          visibleBlockIndex={visibleBlockIndex}
          hasNextPage={hasNextPage}
          loading={loading}
          isShowPhotoSlider={isShowPhotoSlider}
          numberOfBlocks={numberOfBlocks}
          numberOfAddedPhotos={numberOfAddedPhotos}
          numberOfItemsInBlock={numberOfItemsInBlock}
          items={items}
        />
      )}
      {/* <div ref={containerRef} className="m-auto w-9/12">
        <Blocks
          blockHeight={blockHeight}
          activeObservableIndex={visibleBlockIndex}
          hasNextPage={hasNextPage}
          loading={loading}
          isShowPhotoSlider={isShowPhotoSlider}
          numberOfBlocks={numberOfBlocks}
        >
          <Cards
            numberOfAddedItems={numberOfAddedPhotos}
            numberOfItemsInBlock={numberOfItemsInBlock}
            items={items}
            loading={loading}
          />
        </Blocks>
      </div> */}

      <div className="fixed top-2 right-24 bg-black px-4 py-2 rounded shadow">
        <Button
          variant="contained"
          size="small"
          onClick={() => setShowSlider((show) => !show)}
        >
          toggle slider
        </Button>
        <span> | </span>
        <Button variant="contained" size="small" onClick={reset}>
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
    </>
  );
};
