import ZoomBtn_ from "../../component/ZoomBtn";
import { useImgZoom } from "../../hook/useImgZoom";
import { usePhotoSliderContext } from "../../hook/usePhotoSliderContext";

const ZoomBtn = () => {
  const { setGZoom } = usePhotoSliderContext();

  const props = useImgZoom(setGZoom);

  return (
    <ZoomBtn_
      handleSliderChange={props.handleSliderChange}
      cancel={props.cancel}
      zoom={props.value}
    />
  );
};

export default ZoomBtn;
