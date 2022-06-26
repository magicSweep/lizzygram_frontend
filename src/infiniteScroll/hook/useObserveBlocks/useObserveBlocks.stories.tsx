import Box from "@mui/system/Box";
import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import { useObserveBlocks } from ".";
import wait from "waait";
//import { unstable_batchedUpdates } from "react-dom";
//import { findLastIndex } from "lodash-es";

export default {
  component: Box,
  title: "useObserveBlocks",
};

export const Default = () => {
  ////////////

  /* arrayOfBlocksWithItems,
  numberOfBlocks,
  blockHeight,
  numberOfItemsInBlock, */

  /////////////////////

  /* const [items, setItems] = useState([1, 2, 3]);
  const [loading, setLoading] = useState(false); */
  const [state, setState] = useState({
    items: [1, 2, 3],
    prevItemsLength: 0,
    loading: false,
    hasNextPage: true,
    count: 0,
  });

  const length = state.items.length;

  const loadMore = async () => {
    if (state.hasNextPage === false) return;

    const prevItemsLength = state.items.length;

    setState({
      ...state,
      loading: true,
    });

    await wait(2000);

    setState((prevState) => {
      /* if (prevState.hasNextPage === false) {
          return {
            ...prevState,
            loading: false,
            hasNextPage: false,
          };
        } */

      return {
        items: [
          ...prevState.items,
          prevState.items[prevState.items.length - 1] + 1,
        ],
        hasNextPage: prevState.count <= 2,
        loading: false,
        prevItemsLength,
        count: prevState.count + 1,
      };
    });
    //setItems((items) => [...items, items[items.length - 1] + 1]);
    //setLoading(false);
  };

  const { observerIndex, addTarget } = useObserveBlocks();

  useEffect(() => {
    if (state.prevItemsLength > 0) {
      addTarget(state.items.length, state.prevItemsLength);
    }
  }, [state.prevItemsLength]);

  const elements = state.items.map((val, i) => {
    return (
      <Box
        key={i + "_" + val}
        id={`OBSERVER_TARGET__${i}`}
        data-observer-index={`${i}`}
        height="110vh"
        //height={i === length - 1 ? "auto" : "900px"}
        className="w-full border-2 border-solid text-center bg-white"
      >{`OBSERVER_TARGET__${i}`}</Box>
    );
  });

  console.log("[RENDER INTERSECTION]", observerIndex);

  return (
    <>
      <Box className="fixed p-2">
        <ul>
          <li>observerIndex - {observerIndex}</li>
          <li>loading - {JSON.stringify(state.loading)}</li>
          <li>hasNextPage - {JSON.stringify(state.hasNextPage)}</li>
          <li>count - {state.count}</li>
        </ul>
      </Box>
      <Box
        width="80%"
        height="50vh"
        className="m-auto p-2 overflow-auto bg-red-200"
      >
        {elements}
        {state.loading === false && (
          <Button onClick={loadMore}>Load more</Button>
        )}
      </Box>
    </>
  );
};
