import React from "react";
import SEO from "../component/SEO";
import NotAuth from "../component/NotAuth";
import {
  LoadableAddPhotoBtn,
  LoadableAddPhotoManager,
  LoadableEditPhotoManager,
} from "../i-photos/addEditPhoto";
import { LoadablePhotoSlider } from "../i-photos/photoSlider";
import { LoadableWallOfPhotos } from "../i-photos/wallOfPhotos";
import { LoadableSearchPhotoForm } from "./../search";
/////
//import { getAuth } from "firebase/auth";
//import { Button } from "@mui/material";

/* const getToken = async () => {
  try {
    const token = await getAuth().currentUser.getIdToken(
      /* forceRefresh / true
    );

    console.log("------------TOKEN", token);
  } catch (err) {
    console.error("------------TOKEN ERROR", err);
  }
}; */

/* 
  This is main page
  It exists for one purpose - when user first time came to our site - we do not load firestore
  This page has two states: 
   - not auth widget
   - loading - check auth status 
*/

const IndexPage = () => {
  //console.log("RENDER INDEX PAGE");
  return (
    <main>
      <SEO title="Фото альбом" />

      {/*  <Button onClick={getToken}>Get token</Button> */}

      <NotAuth />

      <LoadableAddPhotoBtn />

      <LoadableWallOfPhotos />

      <LoadablePhotoSlider />

      <LoadableAddPhotoManager />

      <LoadableEditPhotoManager />

      <LoadableSearchPhotoForm />

      {/* <Link to="/wall-of-photos">Стена фотографий.</Link> */}
    </main>
  );
};

export default IndexPage;
