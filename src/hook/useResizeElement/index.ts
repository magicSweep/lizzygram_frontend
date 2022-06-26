import { MutableRefObject, useEffect, useRef, useState } from "react";

const onResize =
  (setSize: any, widthRef: MutableRefObject<number>) =>
  (entries: ResizeObserverEntry[]) => {
    let newWidth = 0;
    for (let entry of entries) {
      if (entry.contentBoxSize) {
        // Firefox implements `contentBoxSize` as a single content rect, rather than an array
        const contentBoxSize: ResizeObserverEntry["contentBoxSize"] =
          Array.isArray(entry.contentBoxSize)
            ? entry.contentBoxSize[0]
            : entry.contentBoxSize;

        // inlineSize - width, blockSize - height
        newWidth = Math.floor((contentBoxSize as any).inlineSize);

        if (newWidth !== widthRef.current) setSize(newWidth);
        //console.log("Width", (contentBoxSize as any).inlineSize);
      } else {
        newWidth = Math.floor(entry.contentRect.width);

        if (newWidth !== widthRef.current) setSize(newWidth);
        //console.log("contentRect", contentRect.width);
      }
    }

    //console.log("Size changed");
  };

let resizeObserver: ResizeObserver;

export const useResizeElement = (htmlElement: any) => {
  const [width, setWidth] = useState(0);

  const widthRef: MutableRefObject<number> = useRef(0);
  widthRef.current = width;

  useEffect(() => {
    if (resizeObserver === undefined)
      resizeObserver = new ResizeObserver(onResize(setWidth, widthRef));

    resizeObserver.observe(htmlElement.current);

    return () => {
      resizeObserver.disconnect();

      resizeObserver = undefined as any;
    };
  }, []);

  const unobserve = () => {
    resizeObserver.unobserve(htmlElement.current);
  };

  return {
    width,
    unobserve,
  };
};
