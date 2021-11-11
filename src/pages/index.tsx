import React, { CSSProperties } from "react";
import { compose } from "fmagic";
import { Link } from "../component/Link";
import Button from "@mui/material/Button";
import SEO from "../component/SEO";
import NotAuth from "../component/NotAuth";

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

      <NotAuth />

      <Link to="/faq">FAQ по работе сайта.</Link>

      {/* <Link to="/wall-of-photos">Стена фотографий.</Link> */}
    </main>
  );
};

export default IndexPage;
