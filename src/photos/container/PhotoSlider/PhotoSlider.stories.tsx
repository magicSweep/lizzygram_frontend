//import PhotoSlider from "./PhotoSlider";
import { Button } from "@mui/material";
import { useDispatch } from "react-redux";
import { showPhotoSliderAC } from "../../store/action";
import PhotoSliderLoadableWrapper from ".";
//import { usePhotos } from "./../../hook/usePhotos";

export default {
  component: PhotoSliderLoadableWrapper,
  title: "Photos/PhotoSlider",
};

const Slider = () => {
  const dispatch = useDispatch();

  const onClick = () => dispatch(showPhotoSliderAC(0));

  return (
    <>
      <Button onClick={onClick}>Show photo slider</Button>

      <PhotoSliderLoadableWrapper />
    </>
  );
};

/* const PhotosTest = () => {
  const props = usePhotos();

  return <p>{JSON.stringify(props)}</p>;
}; */

export const Default = () => <Slider />;
