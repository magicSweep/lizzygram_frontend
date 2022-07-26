import { useCallback, useState } from "react";

const useWithDesc = () => {
  const [width, setWidth] = useState(0);

  const toggleDesc = useCallback(
    () => setWidth((width) => (width === 0 ? 290 : 0)),
    []
  );

  return {
    width,
    setWidth,
    toggleDesc,
  };
};

export default useWithDesc;
