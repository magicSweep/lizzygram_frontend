import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  MutableRefObject,
} from "react";
import wait from "waait";

let pages = 1;
let maxPages = 4;

export const useItems = (numberOfItemsPerQuery: number) => {
  const [state, setState] = useState<any>(() => {
    //const items = [...Array(numberOfItemsPerQuery + 3).keys()];

    // console.log("useItems - init", items, numberOfItemsPerQuery);

    return {
      items: undefined,
      numberOfAddedPhotos: 0,
      loading: true,
      hasNextPage: true,
    };
  });

  const initItems = async () => {
    await wait(4000);

    setState({
      ...state,
      items: [...Array(numberOfItemsPerQuery + 3).keys()],
      loading: false,
    });
  };

  useEffect(() => {
    initItems();
  }, []);

  const addOneItem = () => {
    setState((state) => ({
      ...state,
      numberOfAddedPhotos: state.numberOfAddedPhotos + 1,
    }));

    setTimeout(() => {
      setState((state) => {
        // @ts-ignore
        const items = [Date.now(), ...state.items];

        return {
          ...state,
          items,
          numberOfAddedPhotos: state.numberOfAddedPhotos - 1,
        };
      });
    }, 2000);
  };

  const fetch = () => {
    if (pages > maxPages) return;

    setState((state) => ({
      ...state,
      loading: true,
    }));

    setTimeout(() => {
      setState((state) => {
        const last = state.items.length;
        const newItems = [...state.items];

        const itemsPerPage = pages === maxPages ? 2 : numberOfItemsPerQuery;

        console.log("ADD PAGE", itemsPerPage, pages);

        for (let i = 0; i < itemsPerPage; i++) {
          newItems.push(i + last);
        }

        pages++;

        return {
          ...state,
          loading: false,
          items: newItems,
          hasNextPage: pages <= maxPages,
        };
      });
    }, 2000);
  };

  const newState = () => {
    pages = 1;

    setState((state) => ({
      ...state,
      items: undefined as any,
      loading: true,
    }));

    setTimeout(() => {
      setState((state) => {
        // @ts-ignore
        const items = [...Array(numberOfItemsPerQuery * 3).keys()];

        return {
          ...state,
          items,
          loading: false,
          hasNextPage: true,
        };
      });
    }, 2000);
  };

  const newOnePageState = () => {
    pages = 1;

    setState((state) => ({
      ...state,
      items: null as any,
      loading: true,
      hasNextPage: false,
    }));

    setTimeout(() => {
      setState((state) => {
        // @ts-ignore
        const items = [...Array(2).keys()];

        return {
          ...state,
          items,
          loading: false,
          hasNextPage: false,
        };
      });
    }, 2000);
  };

  return {
    ...state,
    fetch,
    reset: newState,
    newOnePageState,
    addOneItem,
  };
};
