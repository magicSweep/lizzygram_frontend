export const getDoesRenderElements = (
  pageIndex: number,
  activeObservableIndex: number,
  /*  hasNextPage: boolean,
  isLast: boolean,
  loading: boolean, */
  isShowSlider: boolean,
  blockHeight: number
) => {
  if (isShowSlider === true || blockHeight === 0) return false;

  const isVisible =
    pageIndex === activeObservableIndex ||
    pageIndex === activeObservableIndex - 1 ||
    pageIndex === activeObservableIndex + 1;

  if (isVisible === false) return false;

  /* if (isLast === true && hasNextPage === true && loading === false)
    return false; */

  return true;
};

export const getBlockHeight = (
  hasNextPage: boolean,
  isLast: boolean,
  loading: boolean,
  blockHeight: number
) => {
  if (isLast === true && loading === false && hasNextPage === false) {
    return "auto";
  }

  return `${blockHeight}px`;
};

export const calcIsLast = (
  blockIndex: number,
  numberOfBlocks: number,
  hasNextPage: boolean
) => {
  /*   numberOfBlocks === 0 &&
    (loading === true || hasNextPage === true || itemsLength >= 0) */
  const isLast_ = blockIndex === numberOfBlocks - 1;

  if (isLast_ === false) return false;

  if (numberOfBlocks === 1) {
    if (hasNextPage === true) return false;
  }

  return true;

  //const isLast = numberOfBlocks_ !== 1 && blockIndex === numberOfBlocks_ - 1;
};
