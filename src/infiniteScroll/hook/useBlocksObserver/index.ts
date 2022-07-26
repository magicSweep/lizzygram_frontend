import { useEffect, useState, useCallback } from "react";
import {
  setTargetsToObserver,
  addTargetToObserver,
  onIntersection_,
  observerDisconnect,
} from "./BlocksObserver.service";

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

let observer: IntersectionObserver = undefined as any;

// THIS HOOK INIT INTERSECTION OBSERVER
// TO KNOW WHAT BLOCK IS VISIBLE ON SCREEN NOW
// IT RETURN METHODS TO ADD OR RE-SET TARGETS TO OBSERVER
export const useBlocksObserver = () =>
  //items: any[],
  /* numberOfBlocks: number,
  hasNextPage: boolean,
  loading: boolean,
  loadMore?: any */
  {
    /* const mainRef: MutableRefObject<any> = useRef({
    prevObserverIndex: 0,
    prevNumberOfBlocks: numberOfBlocks,
  }); */

    const [state, setState] = useState({
      visibleIndex: 0,
      prevVisibleIndex: 0,
    });

    const onIntersection = useCallback(onIntersection_(setState), []);

    if (observer === undefined)
      observer = new IntersectionObserver(onIntersection, options);

    const addTarget = useCallback(addTargetToObserver(observer), []);
    const setTargets = useCallback(setTargetsToObserver(observer), []);
    const disconnect = useCallback(observerDisconnect(observer), []);

    const resetState = useCallback(() => {
      //mainRef.current.prevObserverIndex = 0;
      setState((prevState) => ({
        ...prevState,
        visibleIndex: 0,
      }));
    }, []);

    useEffect(() => {
      setTargets();

      return () => {
        //console.log("OBSERVER INTERSECTION UNSUBSCRIBE", observer);
        if (observer !== undefined) {
          disconnect();
          observer = undefined as any;
          //console.log("OBSERVER INTERSECTION UNSUBSCRIBE final", observer);
        }
      };
    }, []);

    /*  useEffect(() => {
    /* console.log(
      "PAGES CHANGED",
      numberOfPages,
      mainRef.current.prevNumberOfPages
    ); /

    onPagesChange(
      mainRef,
      numberOfBlocks,
      reset,
      observer,
      setTargetsToObserver,
      addTargetToObserver,
      window
    );
  }, [numberOfBlocks]);

  // DO WE NEED LOAD MORE ITEMS
  useEffect(() => {
    if (observerIndex === numberOfBlocks - 1 && hasNextPage === true) {
      if (loadMore !== undefined && loading === false) loadMore();
    }
  }, [observerIndex]);
 */
    return {
      ...state,
      resetState,
      addTarget /* : addTargetToObserver(observer) */,
      setTargets,
      disconnect,
    };
  };
