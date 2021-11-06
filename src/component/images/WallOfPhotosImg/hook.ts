import { MutableRefObject, useEffect, useRef, useState } from "react";

export const useImageLoad = () => {
  const timeoutRef: MutableRefObject<NodeJS.Timeout> = useRef();

  const [loaded, setLoaded] = useState(false);

  const onLoad = () => {
    timeoutRef.current = setTimeout(() => setLoaded(true), 100);
  };

  useEffect(() => {
    return () => clearTimeout(timeoutRef.current);
  }, []);

  return {
    loaded,
    onLoad,
    setLoaded,
  };
};
