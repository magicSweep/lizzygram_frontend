const calcNumberOfBlocks = (
  itemsLength: number,
  numberOfItemsInBlock: number,
  hasNextPage: boolean
) => {
  let numberOfBlocks = Math.ceil(itemsLength / numberOfItemsInBlock);

  if (itemsLength % numberOfItemsInBlock === 0) {
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

export const calc = (
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

export const doesNeedCalc = (blockWidth: number) => {
  return typeof blockWidth === "number" && blockWidth > 0;
};
