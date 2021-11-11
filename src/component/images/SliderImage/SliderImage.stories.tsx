import SliderImage from ".";
import Box from "@mui/system/Box";
import React, { useState } from "react";
import Button from "@mui/material/Button";
import { photos } from "./../../../photos/mock/fake.data";

export default {
  component: SliderImage,
  title: "Images/SliderImage",
  decorators: [],
};

export const Default = () => {
  const [index, setIndex] = useState(0);
  const [zoom, setZoom] = useState(0);

  const [edited, setEdited] = useState(false);

  const indexIncrease = () => {
    const length = photos.length;

    setIndex((index: number) => {
      if (index < length - 1) {
        setZoom(1);
        return index + 1;
      }

      return index;
    });
  };

  const indexDecrease = () => {
    setIndex((index: number) => {
      if (index > 0) {
        setZoom(0);
        return index - 1;
      }

      return index;
    });
  };

  const zoomIncrease = () => {
    setZoom((zoom: number) => {
      if (zoom < 400) {
        //setLoaded(false);
        return zoom + 10;
      }

      return zoom;
    });
  };

  const zoomDecrease = () => {
    setZoom((zoom: number) => {
      if (zoom >= 10) {
        //setLoaded(false);
        return zoom - 10;
      }

      return zoom;
    });
  };

  return (
    <>
      <Box
        width="80vw"
        height="70vh"
        className="relative  bg-black  mt-8 mx-auto flex justify-center items-center"
      >
        <SliderImage
          base64={photos[index].base64}
          photoAspectRatio={photos[index].aspectRatio}
          src={photos[index].src}
          zoom={zoom}
          isLoading={edited}
          loadText="Применяем изменения..."
          /* src="" */
          alt="hello"
        />
      </Box>

      <Box className="w-full flex justify-around">
        <Box className="flex m-auto justify-center items-center" width="200px">
          <Button onClick={indexDecrease}>Prev</Button>
          <span> | </span>
          <Button onClick={indexIncrease}>Next</Button>
        </Box>

        <Button onClick={() => setEdited((edited) => !edited)}>
          Toggle edited
        </Button>

        <Box className="flex m-auto justify-center items-center" width="200px">
          <Button onClick={zoomDecrease}>-</Button>
          <span> | </span>
          <Button onClick={zoomIncrease}>+</Button>
        </Box>
      </Box>
    </>
  );
};

export const Test = () => {
  return (
    <Box
      width="600px"
      height="400px"
      className="relative bg-black mt-8 mx-auto overflow-hidden"
    >
      <div className="w-full h-full flex flex-nowrap">
        <Box className="relative h-full flex flex-shrink-1 flex-grow-1  bg-black ">
          <div className=" h-full relative flex flex-shrink-1 flex-grow-0 overflow-auto">
            <Box
              component="img"
              alt="hello"
              width="auto"
              height="150%"
              maxWidth="none"
              //className="flex-shrink-1 flex-grow-0"
              src={photos[0].src}
            />
            {/*   <Box
              sx={{
                bgcolor: "secondary",
              }}
              className="absolute inset-0"
            ></Box> */}
          </div>
        </Box>
        <Box
          width="300px"
          height="100%"
          bgcolor="primary.main"
          className="flex-shrink-0 flex-grow-1"
        ></Box>
      </div>
    </Box>
  );
};
