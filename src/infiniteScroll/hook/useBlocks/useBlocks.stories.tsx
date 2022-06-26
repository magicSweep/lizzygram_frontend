import React, { ComponentProps, useEffect, useRef } from "react";
import { Story } from "@storybook/react";
import { Box } from "@mui/system";
import { useResizeElement } from "./../../../hook/useResizeElement";
import { useBlocks } from ".";

const getBlocks = (
  items: any[],
  numberOfBlocks: number,
  blockHeight: number,
  numberOfItemsInBlock: number,
  numberOfAddedItems: number
) => {
  const blocksElements: any[] = [];

  const length = items.length;

  for (let i = 1; i <= numberOfBlocks; i++) {
    const itemsElements: any[] = [];

    for (
      let y = numberOfItemsInBlock * (i - 1);
      y < numberOfItemsInBlock * i;
      y++
    ) {
      //console.log("-------------", i, y);

      if (numberOfAddedItems > y) {
        itemsElements.push(
          <div
            key={`skeleton-${y}`}
            /* ref={y === 0 ? cardRef : undefined} */
            className="p-2"
          >
            <div className="w-24 h-16  bg-gray-400">{`Added photo - ${y}`}</div>
          </div>
        );
      } else {
        //items[i * y - numberOfAddedItems]
        if (y - numberOfAddedItems < length) {
          itemsElements.push(
            <div
              key={`item-${y}`}
              /* ref={y === 0 ? cardRef : undefined} */
              className="p-2"
            >
              <div className="w-24 h-16  bg-blue-400">
                {items[y - numberOfAddedItems]}
              </div>
            </div>
          );
        }
      }
    }

    blocksElements.push(
      <Box
        key={`container-${i}`}
        /* ref={i === 0 ? containerRef : undefined} */
        height={i === numberOfBlocks ? "auto" : `${blockHeight}px`}
        className="w-8/12 flex justify-center items-start flex-wrap border"
      >
        {itemsElements}
      </Box>
    );
  }

  return blocksElements;
};

const items = [...Array(20).keys()];

const Test = () => {
  const containerRef: any = useRef();

  const { width: containerWidth } = useResizeElement(containerRef);

  const { numberOfBlocks, blockHeight, numberOfItemsInBlock } = useBlocks(
    items,
    //numberOfItemsPerQuery
    7,
    112,
    80,
    //containerWidth,
    containerWidth,
    //hasNextPage,
    false,
    //numberOfAddedItems
    2
  );

  console.log(
    "-----------STATE",
    numberOfBlocks,
    blockHeight,
    numberOfItemsInBlock
  );

  /*  useEffect(() => {
    const itemsPerQuery = 10;

    const cardWidth = cardRef.current.getBoundingClientRect().width;

    const numberOfCardsInRow = size === 0 ? 0 : Math.floor(size / cardWidth);

    console.log("card", cardRef.current.getBoundingClientRect().width, size);

    console.log("Number of cards in a row", numberOfCardsInRow);

    console.log(
      "Number of cards in a block",
      Math.floor(itemsPerQuery / numberOfCardsInRow) * numberOfCardsInRow
    );
  }); */

  const isRender = numberOfBlocks > 0 && numberOfItemsInBlock > 0;

  const elements =
    isRender === false
      ? null
      : getBlocks(items, numberOfBlocks, blockHeight, numberOfItemsInBlock, 2);

  return (
    <>
      <div ref={containerRef} className="w-8/12 h-0"></div>
      {`elements | ${containerWidth} | ${numberOfBlocks} | ${blockHeight} | ${numberOfItemsInBlock} `}
      {elements}
    </>
    /*  <div
      ref={containerRef}
      className="w-8/12 flex items-center justify-around flex-wrap border-2"
    >
      {arraysOfItemsByBlocks === undefined && (
        <div ref={cardRef} className="p-2">
          <div className="w-24 h-16 bg-black"></div>
        </div>
      )}

      <div className="p-2">
        <div className="w-24 h-16 bg-black"></div>
      </div>
      <div className="p-2">
        <div className="w-24 h-16 bg-black"></div>
      </div>
      <div className="p-2">
        <div className="w-24 h-16 bg-black"></div>
      </div>
    </div> */
  );
};

export default {
  component: Test,
  title: "useBlocks",
};

const Template: Story<any> = (args) => <Test {...args} />;

export const Default = Template.bind({});

Default.args = {};
