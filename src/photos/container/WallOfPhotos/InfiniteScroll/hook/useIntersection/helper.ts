import { MutableRefObject } from "react";
import { compose, elif, cond, tap, NI_Next, Done } from "fmagic";

export type EntryInfo = { isIntersecting: boolean; observerIndex: number };

export type ItemsData = {
  prevPhotosSize: number;
  newPhotosSize: number;
  numberOfPhotosPerQuery: number;
};

export const setTargetsToObserver = (observer: IntersectionObserver) => {
  let targets = document.querySelectorAll("div[id^='OBSERVER_TARGET__']");

  console.log("TARGETS", targets);

  targets.forEach((target) => observer.observe(target));
};

export const addTargetToObserver = (
  observer: IntersectionObserver,
  pages: number,
  prevPages: number
) => {
  const numberOfNewTargets = pages - prevPages;

  for (let i = 0; i < numberOfNewTargets; i++) {
    console.log("ADD TARGET", prevPages + i);
    let target = document.querySelector(`#OBSERVER_TARGET__${prevPages + i}`);

    observer.observe(target);
  }
};

export const getObserverIndexFromEntry = compose<
  IntersectionObserverEntry,
  number
>(
  (entry: IntersectionObserverEntry) =>
    (entry.target as HTMLElement).dataset.observerIndex,
  (observerIndex: string | undefined) => parseInt(observerIndex)
  //tap((observerIndex: number) => console.log("OBSERVER INDEX", observerIndex))
);

export const onIntersection_ =
  (setCurrentObserverIndex: any, mainRef: any) =>
  (entries: IntersectionObserverEntry[]) =>
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
        elif(
          ({ isIntersecting }: EntryInfo) => isIntersecting === true,
          // WE GOT NEW OBSERVER INDEX
          ({ observerIndex }: EntryInfo) =>
            setCurrentObserverIndex((prevObserverIndex) => {
              mainRef.current.prevObserverIndex = prevObserverIndex;
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
        )
      );

export const onPagesChange = (
  mainRef: MutableRefObject<any>,
  pages: number,
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
          (pages: number) => pages === 0,
          () => {
            //console.log("DISCONNECT pages === 0");
            observer.disconnect();
            reset();
            window.scrollTo({ top: 0, behavior: "smooth" });
          },
        ],
        // IT MEANS WE GET NEW STATE WITH NEW ITEMS
        [
          (pages: number) =>
            mainRef.current.pages === 0 && pages > mainRef.current.pages,
          () => setTargetsToObserver(observer),
        ],
        // WE SCROLL TO NEXT PAGE
        [
          (pages: number) => pages > mainRef.current.pages,
          (pages: number) =>
            addTargetToObserver(observer, pages, mainRef.current.pages),
        ],
        // IF ALL GOES RIGHT IT CAN NOT BE
        // It can be for example if we add new photo, and increase numberOfAddedPhotos
        // and increase number of pages, but on error we get same items length as previous
        // and we decrease number of pages
        [
          (pages: number) => pages < mainRef.current.pages,
          () => {
            observer.disconnect();
            setTargetsToObserver(observer);
          },
        ],
      ])
    ),
    (pages: number) => (mainRef.current.pages = pages)
  )(pages);
