//import PhotoSlider from "./PhotoSlider";
import { Button } from "@mui/material";
import { useDispatch } from "react-redux";
import { showPhotoSliderAC } from "../../store/action";
import PhotoSliderLoadableWrapper from ".";
//import { usePhotos } from "./../../hook/usePhotos";

export default {
  component: PhotoSliderLoadableWrapper,
  title: "Photos/PhotoSlider/PhotoSlider",
};

const Slider = () => {
  //const dispatch = useDispatch();

  // WE NEED FIRST CALL USE PHOTOS

  //const onClick = () => dispatch(showPhotoSliderAC("hello"));

  const onClick = () => console.log("SHOW PHOTOS");

  return (
    <>
      <Button onClick={onClick}>Show photo slider</Button>

      {/* <PhotoSliderLoadableWrapper /> */}
    </>
  );
};

export const Default = () => <Slider />;
