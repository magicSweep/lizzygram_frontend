//import PhotoSlider from "./PhotoSlider";
import { Button } from "@mui/material";
import { useDispatch } from "react-redux";
import { showPhotoSliderAC } from "../../store/action";
import PhotoSliderLoadableWrapper from ".";
//import { usePhotos } from "./../../hook/usePhotos";

export default {
  component: PhotoSliderLoadableWrapper,
  title: "Container/PhotoSlider",
};

const Slider = () => {
  const dispatch = useDispatch();

  // WE NEED FIRST CALL USE PHOTOS

  const onClick = () => dispatch(showPhotoSliderAC(2));

  return (
    <>
      <Button onClick={onClick}>Show photo slider</Button>

      <PhotoSliderLoadableWrapper />
    </>
  );
};

export const Default = () => <Slider />;
