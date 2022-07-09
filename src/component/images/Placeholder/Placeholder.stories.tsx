import WallOfPhotosImg from ".";
import Image from "../Image";
import Box from "@mui/system/Box";
import React, { useEffect, useState, useRef } from "react";
import { photos } from "./../../../i-photos/loadPhotos/fake-data/photos.db";
import { getImageSizeStyle } from "./../helper";
import { Button } from "@mui/material";
import Placeholder from ".";

export default {
  component: WallOfPhotosImg,
  title: "Images/Placeholder",
  decorators: [],
};

//AlterativeWallOfPhotosImg
export const Default = () => {
  const [show, setShow] = useState(false);

  const imgRef = useRef();

  useEffect(() => {
    console.log("REF", imgRef);
  }, []);

  /*  const [load, setLoad] = useState(true);

  useEffect(() => {
    var img = new Image(100, 200);

    img.src = photos[0].src;

    img.onload = () => {
      setLoad(false);
    };
  }, []); */

  let imageSize = getImageSizeStyle(photos[0].aspectRatio, {
    width: 360,
    height: 180,
  });

  /*  imageSize =
    show === false
      ? {
          width: "100%",
          height: "100%",
        }
      : imageSize; */

  console.log("RENDER TEST", imageSize);

  return (
    <>
      <Box
        width="360px"
        height="180px"
        className="relative  bg-black  mt-8 mx-auto flex justify-center items-center"
      >
        <Box
          component="img"
          maxWidth="none"
          loading="lazy"
          src={show === false ? undefined : photos[0].src}
          {...imageSize}
        />

        <Placeholder
          base64={photos[0].base64}
          imageExtension={photos[0].imageExtension as any}
          show={show === false}
        />
      </Box>

      <Button onClick={() => setShow((show) => !show)}>Show image</Button>
    </>
  );
};

/* export const BackgroundImage = () => {
  return (
    <Box
      width="360px"
      height="180px"
      className="relative  bg-black  mt-8 mx-auto flex justify-center items-center"
    >
      <Box
        component="img"
        sx={{
          backgroundImage: `url("data:image/png;base64, ${photos[0].base64}"`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
        src={photos[0].src}
        height="100%"
        width="90%"
      />
    </Box>
  );
}; */
