import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  MutableRefObject,
} from "react";

export const useWindowResize = () => {
  const timeoutRef: MutableRefObject<any> = useRef(null);

  const [resize, setResize] = useState(0);

  const onWindowResize = useCallback((event: any) => {
    clearTimeout(timeoutRef.current);

    timeoutRef.current = setTimeout(() => {
      //console.log("RESIZE", document.body.clientWidth);
      setResize((resize) => resize + 1);
    }, 200);
  }, []);

  useEffect(() => {
    window.addEventListener("resize", onWindowResize, false);

    return () => {
      clearTimeout(timeoutRef.current);

      window.removeEventListener("resize", onWindowResize, false);
    };
  }, []);

  return resize;
};
