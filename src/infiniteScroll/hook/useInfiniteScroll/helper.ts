import { MutableRefObject } from "react";
import { compose, elif, cond, tap, NI_Next, Done } from "fmagic";

export type EntryInfo = { isIntersecting: boolean; observerIndex: number };

export type ItemsData = {
  prevPhotosSize: number;
  newPhotosSize: number;
  numberOfPhotosPerQuery: number;
};

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
};

export const onBlocksChange_ =
  (scrollToTop: any) =>
  (
    numberOfBlocks: number,
    prevNumberOfBlocks: number,
    observer: {
      disconnect;
      resetState;
      setTargets;
      addTarget;
    }
  ) =>
    compose<number, void>(
      tap(
        cond([
          // IT MEANS WE LOADING NEW ITEMS
          [
            (numberOfBlocks: number) => numberOfBlocks === 0,
            () => {
              //console.log("DISCONNECT pages === 0");
              /* observer.disconnect();
            reset(); */
              observer.disconnect();
              observer.resetState();
              //window.scrollTo({ top: 0, behavior: "smooth" });
              scrollToTop();
            },
          ],
          // IT MEANS WE GET NEW STATE WITH NEW ITEMS
          [
            (numberOfBlocks: number) =>
              prevNumberOfBlocks === 0 && numberOfBlocks > prevNumberOfBlocks,
            () => observer.setTargets(),
          ],
          // WE SCROLL TO NEXT PAGE
          [
            (numberOfBlocks: number) => numberOfBlocks > prevNumberOfBlocks,
            (numberOfBlocks: number) =>
              observer.addTarget(numberOfBlocks, prevNumberOfBlocks),
          ],
          // IF ALL GOES RIGHT IT CAN NOT BE
          // It can be for example if we add new photo, and increase numberOfAddedPhotos
          // and increase number of pages, but on error we get same items length as previous
          // and we decrease number of pages
          [
            (numberOfBlocks: number) => numberOfBlocks < prevNumberOfBlocks,
            () => {
              observer.disconnect();
              observer.setTargets();
            },
          ],
        ])
      ) /* 
    (numberOfBlocks: number) =>
      (mainRef.current.prevNumberOfBlocks = numberOfBlocks) */
    )(numberOfBlocks);

export const onBlocksChange = onBlocksChange_(scrollToTop);
