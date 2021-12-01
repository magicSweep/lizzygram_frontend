import {
  useEffect,
  useState,
  MutableRefObject,
  useRef,
  useCallback,
} from "react";
import {
  setTargetsToObserver,
  addTargetToObserver,
  onPagesChange,
  onIntersection_,
} from "./helper";

export type ItemsData = {
  prevPhotosSize: number;
  newPhotosSize: number;
  numberOfPhotosPerQuery: number;
};

let options: IntersectionObserverInit = {
  //root: document.querySelector('#scrollArea'),
  rootMargin: "0px",
  threshold: 0.01,
};

let observer: IntersectionObserver;

// THIS HOOK GET INDEX OF CURRENT ACTIVE PAGE (OBSERVER INDEX)
// AND LOAD MORE ITEMS IF NEEDED
export const useIntersection = (
  //items: any[],
  numberOfPages: number,
  hasNextPage: boolean,
  loading: boolean,
  loadMore?: any
) => {
  const mainRef: MutableRefObject<any> = useRef({
    prevObserverIndex: 0,
    prevNumberOfPages: numberOfPages,
  });

  const [observerIndex, setCurrentObserverIndex] = useState(0);

  const onIntersection = useCallback(
    onIntersection_(setCurrentObserverIndex, mainRef),
    []
  );

  const reset = useCallback(() => {
    mainRef.current.prevObserverIndex = 0;
    setCurrentObserverIndex(0);
  }, []);

  if (observer === undefined)
    observer = new IntersectionObserver(onIntersection, options);

  useEffect(() => {
    setTargetsToObserver(observer);

    return () => {
      //console.log("OBSERVER INTERSECTION UNSUBSCRIBE", observer);
      if (observer !== undefined) {
        observer.disconnect();
        observer = undefined;
        //console.log("OBSERVER INTERSECTION UNSUBSCRIBE final", observer);
      }
    };
  }, []);

  useEffect(() => {
    /* console.log(
      "PAGES CHANGED",
      numberOfPages,
      mainRef.current.prevNumberOfPages
    ); */

    onPagesChange(
      mainRef,
      numberOfPages,
      reset,
      observer,
      setTargetsToObserver,
      addTargetToObserver,
      window
    );
  }, [numberOfPages]);

  // DO WE NEED LOAD MORE ITEMS
  useEffect(() => {
    if (observerIndex === numberOfPages - 1 && hasNextPage === true) {
      if (loadMore !== undefined && loading === false) loadMore();
    }
  }, [observerIndex]);

  return {
    observerIndex,
    reset,
  };
};
