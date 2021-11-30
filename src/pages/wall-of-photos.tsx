//import { Button } from "@mui/material";
import * as React from "react";
//import { useDispatch } from "react-redux";
import SEO from "../component/SEO";
//import { usePhotos } from "../photos/hook/usePhotos";
//import { showPhotoSliderAC } from "../photos/store/action";
import PhotoSliderLoadableWrapper from "./../photos/container/PhotoSlider";
import LoadableAddPhotoReqs from "./../photos/container/AddPhotoReqs";
import LoadableEditPhotoReqs from "./../photos/container/EditPhotoReqs";
import WallOfPhotos from "./../photos/container/WallOfPhotos";
import LoadableSearchPhotoForm from "./../search/form/SearchPhotoForm";

/* const PhotosTest = () => {
  const props = usePhotos();

  return <p>{JSON.stringify(props)}</p>;
}; */

const WallOfPhotosPage = () => {
  return (
    <main>
      <SEO title="Фотоaльбом" />

      <WallOfPhotos />

      <PhotoSliderLoadableWrapper />

      <LoadableAddPhotoReqs />

      <LoadableEditPhotoReqs />

      <LoadableSearchPhotoForm />
    </main>
  );
};

export default WallOfPhotosPage;
