import { onIntersection_, onPagesChange } from "./helper";

describe("useIntersection", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("onIntersection_", () => {
    const state = {
      observerIndex: 0,
    };

    const setCurrentObserverIndex = jest.fn((numberOfFunc: any) => {
      if (typeof numberOfFunc === "number") state.observerIndex = numberOfFunc;

      state.observerIndex = numberOfFunc(state.observerIndex);
    });

    test("On init render we got two pages(if we got items more then for one page)", () => {
      state.observerIndex = 0;

      const entries = [
        {
          isIntersecting: true,
          target: {
            dataset: {
              observerIndex: "0",
            },
          },
        },
        {
          isIntersecting: false,
          target: {
            dataset: {
              observerIndex: "1",
            },
          },
        },
      ];

      const mainRef = {
        current: {
          prevObserverIndex: 0,
        },
      };

      const onIntersection = onIntersection_(setCurrentObserverIndex, mainRef);

      onIntersection(entries as any);

      expect(setCurrentObserverIndex).toHaveBeenCalledTimes(1);

      expect(state.observerIndex).toEqual(0);
      expect(mainRef.current.prevObserverIndex).toEqual(0);
    });

    test("On scroll down we toggle observer index from 0 to 1", () => {
      state.observerIndex = 0;

      const entries = [
        {
          isIntersecting: true,
          target: {
            dataset: {
              observerIndex: "1",
            },
          },
        },
      ];

      const mainRef = {
        current: {
          prevObserverIndex: 0,
        },
      };

      const onIntersection = onIntersection_(setCurrentObserverIndex, mainRef);

      onIntersection(entries as any);

      expect(setCurrentObserverIndex).toHaveBeenCalledTimes(1);

      expect(state.observerIndex).toEqual(1);
      expect(mainRef.current.prevObserverIndex).toEqual(0);
    });

    test("If we deside to scroll to top before prev page was hide - we trigger one entry with index 1 and isIntersected equal false - we toggle index to prev value - 0", () => {
      state.observerIndex = 1;

      const entries = [
        {
          isIntersecting: false,
          target: {
            dataset: {
              observerIndex: "1",
            },
          },
        },
      ];

      const mainRef = {
        current: {
          prevObserverIndex: 0,
        },
      };

      const onIntersection = onIntersection_(setCurrentObserverIndex, mainRef);

      onIntersection(entries as any);

      expect(setCurrentObserverIndex).toHaveBeenCalledTimes(1);

      expect(state.observerIndex).toEqual(0);
      expect(mainRef.current.prevObserverIndex).toEqual(1);
    });

    test("If we scroll down we get trigger on prev entry hide - we set same index", () => {
      state.observerIndex = 1;

      const entries = [
        {
          isIntersecting: false,
          target: {
            dataset: {
              observerIndex: "0",
            },
          },
        },
      ];

      const mainRef = {
        current: {
          prevObserverIndex: 0,
        },
      };

      const onIntersection = onIntersection_(setCurrentObserverIndex, mainRef);

      onIntersection(entries as any);

      expect(setCurrentObserverIndex).toHaveBeenCalledTimes(1);

      expect(state.observerIndex).toEqual(1);
      expect(mainRef.current.prevObserverIndex).toEqual(0);
    });

    test("If we got two entries with isIntersecting equals true", () => {
      state.observerIndex = 0;

      const entries = [
        {
          isIntersecting: true,
          target: {
            dataset: {
              observerIndex: "0",
            },
          },
        },
        {
          isIntersecting: true,
          target: {
            dataset: {
              observerIndex: "1",
            },
          },
        },
      ];

      const mainRef = {
        current: {
          prevObserverIndex: 6,
        },
      };

      const onIntersection = onIntersection_(setCurrentObserverIndex, mainRef);

      onIntersection(entries as any);

      expect(setCurrentObserverIndex).toHaveBeenCalledTimes(1);

      expect(state.observerIndex).toEqual(1);
      expect(mainRef.current.prevObserverIndex).toEqual(0);
    });
  });

  describe("onPagesChange", () => {
    const addTargetToObserver = jest.fn();
    const setTargetsToObserver = jest.fn();
    const reset = jest.fn();

    const observer = {
      disconnect: jest.fn(),
    };

    const window = {
      scrollTo: jest.fn(),
    };

    test("If pages equals 0 - we load new items, that's why we reset all", () => {
      const mainRef = {
        current: {
          pages: 0,
        },
      };

      onPagesChange(
        mainRef,
        0,
        reset,
        observer as any,
        setTargetsToObserver,
        addTargetToObserver,
        window
      );

      expect(reset).toHaveBeenCalledTimes(1);
      expect(observer.disconnect).toHaveBeenCalledTimes(1);
      expect(window.scrollTo).toHaveBeenCalledTimes(1);

      expect(setTargetsToObserver).toHaveBeenCalledTimes(0);
    });

    test("We get new state with new items", () => {
      const mainRef = {
        current: {
          pages: 0,
        },
      };

      onPagesChange(
        mainRef,
        2,
        reset,
        observer as any,
        setTargetsToObserver,
        addTargetToObserver,
        window
      );

      expect(reset).toHaveBeenCalledTimes(0);
      expect(observer.disconnect).toHaveBeenCalledTimes(0);
      expect(window.scrollTo).toHaveBeenCalledTimes(0);

      expect(setTargetsToObserver).toHaveBeenCalledTimes(1);
    });

    test("We scroll to next page", () => {
      const mainRef = {
        current: {
          pages: 3,
        },
      };

      onPagesChange(
        mainRef,
        4,
        reset,
        observer as any,
        setTargetsToObserver,
        addTargetToObserver,
        window
      );

      expect(reset).toHaveBeenCalledTimes(0);
      expect(observer.disconnect).toHaveBeenCalledTimes(0);
      expect(window.scrollTo).toHaveBeenCalledTimes(0);

      expect(setTargetsToObserver).toHaveBeenCalledTimes(0);
      expect(addTargetToObserver).toHaveBeenCalledTimes(1);
    });

    test(`We get less pages then before - It can be for example if we add new photo, 
     and increase numberOfAddedPhotos
     and increase number of pages, but on error we get same items length as previous
     and we decrease number of pages`, () => {
      const mainRef = {
        current: {
          pages: 4,
        },
      };

      onPagesChange(
        mainRef,
        3,
        reset,
        observer as any,
        setTargetsToObserver,
        addTargetToObserver,
        window
      );

      expect(reset).toHaveBeenCalledTimes(0);
      expect(observer.disconnect).toHaveBeenCalledTimes(1);
      expect(window.scrollTo).toHaveBeenCalledTimes(0);

      expect(setTargetsToObserver).toHaveBeenCalledTimes(1);
      expect(addTargetToObserver).toHaveBeenCalledTimes(0);
    });
  });
});
