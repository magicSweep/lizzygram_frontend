import { useState } from "react";

const calcZoom = (zoomValue: number) => zoomValue * 4;

export const useImgZoom = (onHandleSliderChange?: (zoom: number) => void) => {
  const [value, setValue] = useState<number>(0);

  const cancel = () => {
    setValue(0);
    if (onHandleSliderChange !== undefined) onHandleSliderChange(0);
  };

  const handleSliderChange = (event: any, newValue: number | number[]) => {
    //console.log("handleSliderChange", newValue);
    setValue(newValue as number);
    if (onHandleSliderChange !== undefined)
      onHandleSliderChange(calcZoom(newValue as number));
  };

  const zoom = calcZoom(value);

  return {
    value,
    zoom,
    cancel,
    handleSliderChange,
  };
};
