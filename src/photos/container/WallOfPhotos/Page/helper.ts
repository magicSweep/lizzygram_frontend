export const getDoesRenderElements = (
  pageIndex: number,
  activeObservableIndex: number,
  hasNextPage: boolean,
  isLast: boolean,
  loading: boolean,
  isShowSlider: boolean
) => {
  if (isShowSlider === true) return false;

  const isVisible =
    pageIndex === activeObservableIndex ||
    pageIndex === activeObservableIndex - 1 ||
    pageIndex === activeObservableIndex + 1;

  if (isVisible === false) return false;

  if (isLast === true && hasNextPage === true && loading === false)
    return false;

  return true;
};
