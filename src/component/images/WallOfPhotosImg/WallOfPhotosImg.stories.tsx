import WallOfPhotosImg from ".";
import Box from "@mui/system/Box";
import React, { useState } from "react";
import { photos } from "./../../../i-photos/loadPhotos/fake-data/photos.db";

export default {
  component: WallOfPhotosImg,
  title: "Images/WallOfPhotosImg",
  decorators: [],
};

export const Default = () => {
  return (
    <>
      <Box
        width="360px"
        height="180px"
        className="relative  bg-black  mt-8 mx-auto flex justify-center items-center"
      >
        <WallOfPhotosImg
          base64={photos[0].base64}
          photoAspectRatio={photos[0].aspectRatio}
          src={photos[0].src}
          /* src="" */
          alt="hello"
        />
      </Box>
    </>
  );
};
