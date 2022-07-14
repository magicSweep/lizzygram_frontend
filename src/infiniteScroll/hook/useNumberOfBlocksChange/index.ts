import { cond } from "fmagic";
import { MutableRefObject, useEffect, useRef } from "react";
import {
  onChange as onNumberOfBlocksChange,
  WhatHappend,
} from "./numberOfBlocksChange.service";

export const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
};

export const useNumberOfBlocksChange = (
  numberOfBlocks: number,
  observer: any
) => {
  const prevNumberOfBlocksRef: MutableRefObject<number> = useRef(0);

  console.log("1 ============useNumberOfBlocksChange", numberOfBlocks);

  useEffect(() => {
    const whatHappend = onNumberOfBlocksChange({
      numberOfBlocks,
      prevNumberOfBlocks: prevNumberOfBlocksRef.current,
    });

    console.log("============useNumberOfBlocksChange", whatHappend);

    cond([
      [
        (whatHappend: WhatHappend) => whatHappend === "NEW_ITEMS",
        () => {
          observer.setTargets();
        },
      ],
      [
        (whatHappend: WhatHappend) => whatHappend === "LOADING_NEW_ITEMS",
        () => {
          observer.disconnect();
          observer.resetState();
          scrollToTop();
        },
      ],
      [
        (whatHappend: WhatHappend) => whatHappend === "NEXT_PAGE",
        () => {
          observer.addTarget(numberOfBlocks, prevNumberOfBlocksRef.current);
        },
      ],
      [
        (whatHappend: WhatHappend) => whatHappend === "ANOMALY",
        () => {
          observer.disconnect();
          observer.setTargets();
        },
      ],
      [
        (whatHappend: WhatHappend) => whatHappend === "VERY_ANOMALY",
        () => {
          observer.disconnect();
          observer.setTargets();
        },
      ],
    ])(whatHappend);

    prevNumberOfBlocksRef.current = numberOfBlocks;
  }, [numberOfBlocks]);
};
