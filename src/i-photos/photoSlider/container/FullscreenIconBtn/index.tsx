import React from "react";
import Fullscreen from "../../../../component/Fullscreen";
//import useFullscreen from "../../../../hook/useFullscreen";
import { usePhotoSliderContext } from "../../hook/usePhotoSliderContext";

const FullscreenIconBtn = () => {
  //const props = useFullscreen();

  const { isFullscreen, requestFullscreen, exitFullscreen } =
    usePhotoSliderContext();

  return (
    <Fullscreen
      isFullscreen={isFullscreen}
      requestFullscreen={requestFullscreen}
      exitFullscreen={exitFullscreen}
    />
  );
};

export default FullscreenIconBtn;
