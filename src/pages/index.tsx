import React from "react";
import SEO from "../component/SEO";
import NotAuth from "../component/NotAuth";
import LoadableAddPhotoBtn from "../photos/container/AddPhotoBtn";
//import LoadablePhotoSlider from "../photos/container/PhotoSlider";
//import LoadableAddPhotoReqs from "../photos/container/AddPhotoReqs";
//import LoadableEditPhotoReqs from "../photos/container/EditPhotoReqs";
import LoadableWallOfPhotos from "../photos/container/WallOfPhotos";

//import LoadableSearchPhotoForm from "./../search/form/SearchPhotoForm";

/* 
  This is main page
  It exists for one purpose - when user first time came to our site - we do not load firestore
  This page has two states: 
   - not auth widget
   - loading - check auth status 
*/

const IndexPage = () => {
  return (
    <main>
      <SEO title="Фото альбом" />

      <NotAuth />

      <LoadableAddPhotoBtn />

      <LoadableWallOfPhotos />

      {/* <LoadablePhotoSlider />

      <LoadableAddPhotoReqs />

      <LoadableEditPhotoReqs />

      <LoadableSearchPhotoForm /> */}

      {/* <Link to="/wall-of-photos">Стена фотографий.</Link> */}
    </main>
  );
};

export default IndexPage;
