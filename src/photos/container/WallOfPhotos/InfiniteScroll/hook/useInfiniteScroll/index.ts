import { useWindowResize } from "../useWindowResize";
import { useHelper } from "../useHelper";
import { useIntersection } from "../useIntersection";

export const useInfiniteScroll = (
  items: any[],
  numberOfItemsPerQuery: number,
  cardWidth: number,
  cardHeight: number,
  marginLeft: number,
  marginBottom: number,
  hasNextPage: boolean,
  numberOfAddedPhotos: number,
  loading: boolean,
  loadMore: () => any
) => {
  const resize = useWindowResize();

  /* const {
    loading,
    items,
    fetch,
    hasNextPage,
    newState,
    newOnePageState,
    numberOfAddedPhotos,
    addOneItem,
  } = useItems(numberOfItemsPerPage); */

  const {
    itemsArrays,
    numberOfPages,
    itemsWrapperHeight,
    containerWidth,
    numberOfItemsByPage,
  } = useHelper(
    items,
    numberOfItemsPerQuery,
    cardWidth + marginLeft,
    cardHeight + marginBottom,
    resize,
    hasNextPage,
    numberOfAddedPhotos
  );

  const { observerIndex: visibleIndex } = useIntersection(
    //items,
    numberOfPages,
    hasNextPage,
    loading,
    loadMore
  );

  return {
    visibleIndex,
    itemsArrays,
    numberOfPages,
    itemsWrapperHeight,
    containerWidth,
    numberOfItemsByPage,
  };
};
