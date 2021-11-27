import Box from "@mui/system/Box";
import { useState } from "react";
import { useIntersection } from ".";

export default {
  component: Box,
  title: "Test/Intersection",
};

export const Default = () => {
  const [items, setItems] = useState([1, 2, 3]);

  const length = items.length;

  const loadMore = () =>
    setItems((items) => [...items, items[items.length - 1] + 1]);

  const { observerIndex } = useIntersection(length, true, false, () => {
    console.log("Load more");

    loadMore();
  });

  const elements = items.map((val, i) => {
    return (
      <Box
        key={i + "_" + val}
        id={`OBSERVER_TARGET__${i}`}
        data-observer-index={`${i}`}
        height="900px"
        //height={i === length - 1 ? "auto" : "900px"}
        className="w-full border-2 border-solid"
      ></Box>
    );
  });

  console.log("[RENDER INTERSECTION]", observerIndex);

  return (
    <Box width="80%" className="m-auto pt-5">
      {elements}
    </Box>
  );
};
