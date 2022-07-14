import { MutableRefObject } from "react";
import { compose, elif, cond, tap, NI_Next, Done } from "fmagic";

export type EntryInfo = { isIntersecting: boolean; observerIndex: number };

export type ItemsData = {
  prevPhotosSize: number;
  newPhotosSize: number;
  numberOfPhotosPerQuery: number;
};

export const observerDisconnect = (observer: IntersectionObserver) => () => {
  /* if (observer !== undefined)  */ observer.disconnect();
};

export const setTargetsToObserver = (observer: IntersectionObserver) => () => {
  //if (observer === undefined) return;

  let targets = document.querySelectorAll("div[id^='OBSERVER_TARGET__']");

  //console.log("TARGETS", targets);

  targets.forEach((target) => observer.observe(target));
};

export const addTargetToObserver =
  (observer: IntersectionObserver) =>
  (numberOfBlocks: number, prevNumberOfBlocks: number) => {
    //if (observer === undefined) return;

    const numberOfNewTargets = numberOfBlocks - prevNumberOfBlocks;

    for (let i = 0; i < numberOfNewTargets; i++) {
      //console.log("ADD TARGET", prevPages + i);
      let target = document.querySelector(
        `#OBSERVER_TARGET__${prevNumberOfBlocks + i}`
      );

      observer.observe(target as Element);
    }
  };

export const getObserverIndexFromEntry = compose<
  IntersectionObserverEntry,
  number
>(
  (entry: IntersectionObserverEntry) =>
    (entry.target as HTMLElement).dataset.observerIndex,
  (observerIndex: string) => parseInt(observerIndex)
  //tap((observerIndex: number) => console.log("OBSERVER INDEX", observerIndex))
);

export const onIntersection_ =
  (setState: any) => (entries: IntersectionObserverEntry[]) =>
    NI_Next.of(entries)
      .chain(
        cond([
          [
            // IT MEANS WE INIT OBSERVER
            (entries: IntersectionObserverEntry[]) => {
              //console.log("INTERSECTION", entries);
              return entries.length >= 2;
            },
            compose(
              (entries: IntersectionObserverEntry[]) =>
                entries.filter((entry) => entry.isIntersecting === true),
              elif<
                IntersectionObserverEntry[],
                Done | NI_Next<IntersectionObserverEntry>
              >(
                (entries: IntersectionObserverEntry[]) => entries.length > 2,
                // IT CAN NOT BE
                (entries: IntersectionObserverEntry[]) =>
                  Done.of({
                    msg: "More then two intersected entry",
                    data: entries,
                  }),
                (entries: IntersectionObserverEntry[]) =>
                  entries.length === 2
                    ? NI_Next.of(entries[1])
                    : entries[0] === undefined
                    ? Done.of({
                        msg: "No entries with isIntersecting === true",
                        data: entries,
                      })
                    : NI_Next.of(entries[0])
              )
            ),
          ],

          [
            // IT MEANS ENTRY APPEARS OR HIDES
            (entries: IntersectionObserverEntry[]) => entries.length === 1,
            (entries: IntersectionObserverEntry[]) => NI_Next.of(entries[0]),
          ],

          [
            // IS IT POSSIBLE ?
            (entries: IntersectionObserverEntry[]) => entries.length < 1,
            () =>
              Done.of({
                msg: "On intersection triggers with no one entry",
              }),
          ],
        ])
      )
      .map((entry: IntersectionObserverEntry) => ({
        isIntersecting: entry.isIntersecting,
        observerIndex: getObserverIndexFromEntry(entry),
      }))
      .fold(
        (data: any) => {
          console.log("------DONE", data);
        },
        ({ observerIndex, isIntersecting }: EntryInfo) => {
          if (isIntersecting === true) {
            setState((prevState) => {
              //setPrevObserverIndex(prevObserverIndex);
              return {
                visibleIndex: observerIndex,
                prevVisibleIndex: prevState.visibleIndex,
              };
            });
          } else {
            setState(
              elif(
                (prevState: any) => prevState.visibleIndex === observerIndex,
                (prevState: any) => ({
                  visibleIndex: prevState.prevVisibleIndex,
                  prevVisibleIndex: prevState.visibleIndex,
                }),
                (prevState: any) => ({
                  ...prevState,
                  //observerIndex: prevState.observerIndex,
                })
              )
            );
            /* setCurrentObserverIndex(
              elif(
                (prevObserverIndex) => prevObserverIndex === observerIndex,
                (prevObserverIndex: number) => {
                  const newPrevObserverIndex = getPrevObserverIndex();
                  setPrevObserverIndex(prevObserverIndex);
                  return newPrevObserverIndex;
                },
                (prevObserverIndex) => prevObserverIndex
              )
            ); */
          }
        }
        /* elif(
          ({ isIntersecting }: EntryInfo) => isIntersecting === true,
          // WE GOT NEW OBSERVER INDEX
          ({ observerIndex }: EntryInfo) =>
            setCurrentObserverIndex((prevObserverIndex) => {
              //mainRef.current.prevObserverIndex = prevObserverIndex;
              return observerIndex;
            }),
          // WE MUST SET PREVIOUS INDEX AS ACTIVE IF NEEDED
          ({ observerIndex }: EntryInfo) =>
            setCurrentObserverIndex(
              elif(
                (prevObserverIndex) => prevObserverIndex === observerIndex,
                (prevObserverIndex) => {
                  const newPrevObserverIndex =
                    mainRef.current.prevObserverIndex;
                  mainRef.current.prevObserverIndex = prevObserverIndex;
                  return newPrevObserverIndex;
                },
                (prevObserverIndex) => prevObserverIndex
              )
            )
        ) */
      );

/* export const onPagesChange = (
  mainRef: MutableRefObject<any>,
  numberOfBlocks: number,
  reset: any,
  observer: IntersectionObserver,
  setTargetsToObserver: (observer: IntersectionObserver) => void,
  addTargetToObserver: (
    observer: IntersectionObserver,
    pages: number,
    prevPages: number
  ) => void,
  window: any
) =>
  compose<number, void>(
    tap(
      cond([
        // IT MEANS WE LOADING NEW ITEMS
        [
          (numberOfBlocks: number) => numberOfBlocks === 0,
          () => {
            //console.log("DISCONNECT pages === 0");
            observer.disconnect();
            reset();
            window.scrollTo({ top: 0, behavior: "smooth" });
          },
        ],
        // IT MEANS WE GET NEW STATE WITH NEW ITEMS
        [
          (numberOfBlocks: number) =>
            mainRef.current.prevNumberOfBlocks === 0 &&
            numberOfBlocks > mainRef.current.prevNumberOfBlocks,
          () => setTargetsToObserver(observer),
        ],
        // WE SCROLL TO NEXT PAGE
        [
          (numberOfBlocks: number) =>
            numberOfBlocks > mainRef.current.prevNumberOfBlocks,
          (numberOfBlocks: number) =>
            addTargetToObserver(
              observer,
              numberOfBlocks,
              mainRef.current.prevNumberOfBlocks
            ),
        ],
        // IF ALL GOES RIGHT IT CAN NOT BE
        // It can be for example if we add new photo, and increase numberOfAddedPhotos
        // and increase number of pages, but on error we get same items length as previous
        // and we decrease number of pages
        [
          (numberOfBlocks: number) =>
            numberOfBlocks < mainRef.current.prevNumberOfBlocks,
          () => {
            observer.disconnect();
            setTargetsToObserver(observer);
          },
        ],
      ])
    ),
    (numberOfBlocks: number) =>
      (mainRef.current.prevNumberOfBlocks = numberOfBlocks)
  )(numberOfBlocks);
 */
