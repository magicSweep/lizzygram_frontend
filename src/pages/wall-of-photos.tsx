import { Button } from "@mui/material";
import * as React from "react";
import { useDispatch } from "react-redux";
import SEO from "../component/SEO";
import { usePhotos } from "../photos/hook/usePhotos";
import { showPhotoSliderAC } from "../photos/store/action";
import PhotoSliderLoadableWrapper from "./../photos/container/PhotoSlider";

const PhotosTest = () => {
  const props = usePhotos();

  return <p>{JSON.stringify(props)}</p>;
};

const WallOfPhotos = () => {
  const dispatch = useDispatch();

  const onClick = () => dispatch(showPhotoSliderAC(0));

  return (
    <main>
      <SEO title="Фотографии..." />

      <PhotosTest />

      {/* <Button onClick={onClick}>Show photo slider</Button>

      <PhotoSliderLoadableWrapper /> */}
    </main>
  );
};

export default WallOfPhotos;
