import { onIntersection_ } from "./BlocksObserver.service";

describe("useIntersection", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("onIntersection_", () => {
    let initState = {
      visibleIndex: 0,
      prevVisibleIndex: 0,
    };

    let state = {};

    const setState = jest.fn((stateOfFunc: any) => {
      if (typeof stateOfFunc === "object") state = stateOfFunc;

      state = stateOfFunc(state);
    });

    test("On init render we got two pages(if we got items more then for one page)", () => {
      state = {
        ...initState,
      };

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

      const onIntersection = onIntersection_(setState);

      onIntersection(entries as any);

      expect(setState).toHaveBeenCalledTimes(1);

      expect(state).toEqual({ visibleIndex: 0, prevVisibleIndex: 0 });
    });

    test("On scroll down we toggle observer index from 0 to 1", () => {
      state = {
        ...initState,
      };

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

      const onIntersection = onIntersection_(setState);

      onIntersection(entries as any);

      expect(setState).toHaveBeenCalledTimes(1);

      expect(state).toEqual({ visibleIndex: 1, prevVisibleIndex: 0 });
    });

    test("If we deside to scroll to top before prev page was hide - we trigger one entry with index 1 and isIntersected equal false - we toggle index to prev value - 0", () => {
      state = {
        ...initState,
        visibleIndex: 1,
      };

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

      const onIntersection = onIntersection_(setState);

      onIntersection(entries as any);

      expect(setState).toHaveBeenCalledTimes(1);

      expect(state).toEqual({ visibleIndex: 0, prevVisibleIndex: 1 });
    });

    test("If we scroll down we get trigger on prev entry hide - we set same index", () => {
      state = {
        ...initState,
        visibleIndex: 1,
      };

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

      const onIntersection = onIntersection_(setState);

      onIntersection(entries as any);

      expect(setState).toHaveBeenCalledTimes(1);

      expect(state).toEqual({ visibleIndex: 1, prevVisibleIndex: 0 });
    });

    test("If we got two entries with isIntersecting equals true", () => {
      state = {
        ...initState,
        prevVisibleIndex: 6,
      };

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

      const onIntersection = onIntersection_(setState);

      onIntersection(entries as any);

      expect(setState).toHaveBeenCalledTimes(1);

      expect(state).toEqual({ visibleIndex: 1, prevVisibleIndex: 0 });
    });
  });

  /* describe("onPagesChange", () => {
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
          //pages: 0,
          prevNumberOfPages: 0,
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
          //pages: 0,
          prevNumberOfPages: 0,
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
          //pages: 3,
          prevNumberOfPages: 3,
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
          //pages: 4,
          prevNumberOfPages: 4,
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
  });*/
});
