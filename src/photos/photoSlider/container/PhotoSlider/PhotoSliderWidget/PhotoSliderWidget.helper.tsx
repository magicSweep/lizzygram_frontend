export const isIncreaseAfterLoading = (
  isPhotosData: boolean,
  prevLoading: boolean,
  loading: boolean,
  photosLength: number,
  activeIndex: number
) =>
  photosLength - activeIndex === 1 &&
  isPhotosData === true &&
  prevLoading === true &&
  loading === false;
