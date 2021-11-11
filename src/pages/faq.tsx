import * as React from "react";
//import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
//import { Link } from "../component/Link";
import SEO from "../component/SEO";
import { usePhotos } from "../photos/hook/usePhotos";

const PhotosTest = () => {
  const props = usePhotos();

  return <p>{JSON.stringify(props)}</p>;
};

const Faq = () => {
  return (
    <>
      <SEO title="Ответы на вопросы..." />

      <PhotosTest />

      {/*  <div className="my-4">
        <Typography variant="h4" align="center" component="h1" gutterBottom>
          FAQ по работе сайта
        </Typography>
      </div> */}
    </>
  );
};

export default Faq;
