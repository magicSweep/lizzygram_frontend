import React from "react";
import { Link } from "../component/Link";
import SEO from "../component/SEO";
import NotAuth from "../component/NotAuth";
import {
  LoadablePhotoSlider,
  LoadableAddPhotoReqs,
  LoadableEditPhotoReqs,
  LoadableAddPhotoBtn,
  LoadableWallOfPhotos,
} from "./../photos";
import { LoadableSearchPhotoForm } from "./../search";

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
      <SEO title="Приветствие..." />

      <Link className="text-right" to="/faq">
        FAQ по работе сайта.
      </Link>

      <NotAuth />

      <LoadableAddPhotoBtn />

      <LoadableWallOfPhotos />

      <LoadablePhotoSlider />

      <LoadableAddPhotoReqs />

      <LoadableEditPhotoReqs />

      <LoadableSearchPhotoForm />

      {/* <Link to="/wall-of-photos">Стена фотографий.</Link> */}
    </main>
  );
};

export default IndexPage;
