import { useState } from "react";

export const useImgZoom = () => {
  const [value, setValue] = useState<number>(0);

  const cancel = () => {
    setValue(0);
  };

  const handleSliderChange = (event: any, newValue: number | number[]) => {
    console.log("handleSliderChange", newValue);
    setValue(newValue as number);
  };

  return {
    value,
    zoom: value * 4,
    cancel,
    handleSliderChange,
  };
};
