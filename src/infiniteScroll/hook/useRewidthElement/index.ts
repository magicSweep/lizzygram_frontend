import { useEffect, MutableRefObject, useRef, useState } from "react";

const onResize =
  (setWidth: any, widthRef: MutableRefObject<number>) =>
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

        if (newWidth !== widthRef.current) {
          setWidth(newWidth);
          widthRef.current = newWidth;
        }
        //console.log("Width", (contentBoxSize as any).inlineSize);
      } else {
        newWidth = Math.floor(entry.contentRect.width);

        if (newWidth !== widthRef.current) {
          setWidth(newWidth);
          widthRef.current = newWidth;
        }
        //console.log("contentRect", contentRect.width);
      }
    }

    //console.log("Size changed");
  };

let resizeObserver: ResizeObserver;

export const useRewidthElement = (elemToObserveRef: MutableRefObject<any>) => {
  const [width, setWidth] = useState(0);

  const widthRef: MutableRefObject<number> = useRef(0);

  useEffect(() => {
    if (resizeObserver === undefined)
      resizeObserver = new ResizeObserver(onResize(setWidth, widthRef));

    resizeObserver.observe(elemToObserveRef.current);

    return () => {
      resizeObserver.disconnect();

      resizeObserver = undefined as any;
    };
  }, []);

  /* const unobserve = () => {
    resizeObserver.unobserve(htmlElement.current);
  }; */

  return width;
};
