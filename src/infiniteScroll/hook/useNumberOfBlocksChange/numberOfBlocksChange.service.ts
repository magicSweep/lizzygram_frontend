import { cond } from "fmagic";

export type EntryInfo = { isIntersecting: boolean; observerIndex: number };

export type ItemsData = {
  prevPhotosSize: number;
  newPhotosSize: number;
  numberOfPhotosPerQuery: number;
};

export type WhatHappend =
  | "LOADING_NEW_ITEMS"
  | "NEW_ITEMS"
  | "NEXT_PAGE"
  | "ANOMALY"
  | "VERY_ANOMALY";

export const onChange = cond<
  {
    numberOfBlocks: number;
    prevNumberOfBlocks: number;
  },
  WhatHappend
>([
  // IT MEANS WE LOADING NEW ITEMS
  [
    ({ numberOfBlocks }) => numberOfBlocks === 0,
    () => {
      //console.log("DISCONNECT pages === 0");
      /*  observer.disconnect();
              observer.resetIndex();
              scrollToTop(); */
      return "LOADING_NEW_ITEMS";
    },
  ],
  // IT MEANS WE GET NEW STATE WITH NEW ITEMS
  [
    ({ numberOfBlocks, prevNumberOfBlocks }) =>
      prevNumberOfBlocks === 0 && numberOfBlocks > prevNumberOfBlocks,
    () => "NEW_ITEMS",
  ],
  // WE SCROLL TO NEXT PAGE
  [
    ({ numberOfBlocks, prevNumberOfBlocks }) =>
      numberOfBlocks > prevNumberOfBlocks,
    () => "NEXT_PAGE",
    //observer.addTarget(numberOfBlocks, prevNumberOfBlocks),
  ],
  // IF ALL GOES RIGHT IT CAN NOT BE
  // It can be for example if we add new photo, and increase numberOfAddedPhotos
  // and increase number of pages, but on error we get same items length as previous
  // and we decrease number of pages
  [
    ({ numberOfBlocks, prevNumberOfBlocks }) =>
      numberOfBlocks < prevNumberOfBlocks,
    () => {
      return "ANOMALY";
      /* observer.disconnect();
              observer.setTargets(); */
    },
  ],
  [
    () => true,
    () => {
      return "VERY_ANOMALY";
      /* observer.disconnect();
              observer.setTargets(); */
    },
  ],
]);
