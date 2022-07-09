import MyImage from ".";
import Box from "@mui/system/Box";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import React, { useState, useRef, useEffect, MutableRefObject } from "react";
import { Story } from "@storybook/react";
import { photos } from "./../../../i-photos/loadPhotos/fake-data/photos.db";
import { getImageSizeStyle } from "./../helper";

export default {
  component: MyImage,
  title: "Images/Image",
  decorators: [],
};

export const Default = () => {
  const [show, setShow] = useState(false);

  /*  const [wrapperSize, setWrapperSize] = useState<null | {
    width: number;
    height: number;
  }>(null); */

  const [index, setIndex] = useState(0);

  const [loaded, setLoaded] = useState(false);

  const wrapperRef = useRef(null);

  const indexIncrease = () => {
    const length = photos.length;

    setIndex((prevIndex: number) => {
      if (prevIndex < length - 1) {
        setLoaded(false);
        return prevIndex + 1;
      }

      return prevIndex;
    });
  };

  const indexDecrease = () => {
    setIndex((prevIndex: number) => {
      if (prevIndex > 0) {
        setLoaded(false);
        return prevIndex - 1;
      }

      return prevIndex;
    });
  };

  const onLoad = () => {
    const timeout = setTimeout(() => setLoaded(true), 100);
  };

  /* useEffect(() => {
    const rect = (wrapperRef.current as any).getBoundingClientRect();
    setWrapperSize({
      width: rect.width,
      height: rect.height,
    });
  }, []); */

  const { width, height } = getImageSizeStyle(photos[index].aspectRatio, {
    width: 700,
    height: 400,
  });

  return (
    <>
      <Box
        width="700px"
        height="400px"
        className="relative  bg-black  mt-8 mx-auto flex justify-center items-center overflow-hidden"
      >
        <Box
          className="relative w-full h-full flex justify-center items-center"
          sx={
            {
              /*  transform: `rotateY(${360 * index}deg)`,
            transitionDelay: "0",
            transitionDuration: "300ms",
            transitionProperty: "transform", */
            }
          }
          ref={wrapperRef}
        >
          {show === true && (
            <MyImage
              /*  wrapperSize={wrapperSize}
            photoAspectRatio={1.6}
            base64={photos[index].base64} */
              key={photos[index].src}
              className={`${loaded === false ? "invisible" : "visible"}`}
              onLoad={onLoad}
              width={width}
              height={height}
              src={photos[index].src}
              /* src="" */
              alt="hello"
            />
          )}
          <Fade timeout={300} in={show === true && loaded === false}>
            <Box className="absolute inset-0 flex justify-center items-center">
              <MyImage
                /*  wrapperSize={wrapperSize}
            photoAspectRatio={1.6}
            base64={photos[index].base64} */

                width={width}
                height={height}
                src={`data:image/jpeg;base64, ${photos[index].base64}`}
                /* src="" */
                alt="hello"
              />
            </Box>
          </Fade>
        </Box>
      </Box>

      <br />

      <Box
        sx={{
          display: "flex",
          width: "200px",
          m: "auto",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Button onClick={indexDecrease}>Prev</Button>
        <span> | </span>
        <Button onClick={indexIncrease}>Next</Button>
      </Box>
      <Button onClick={() => setShow((show) => !show)}>Show image</Button>
    </>
  );
};

export const Test = () => {
  const boxRef: MutableRefObject<any> = useRef(null);

  const [load, setLoad] = useState(true);

  useEffect(() => {
    console.log("REF", boxRef);
  }, []);

  console.log("RENDER TEST", load);

  return (
    <MyImage
      /*  wrapperSize={wrapperSize}
photoAspectRatio={1.6}
base64={photos[index].base64} */
      ref={boxRef}
      src={`data:image/jpeg;base64, ${photos[0].base64}`}
      /* src="" */
      alt="hello"
    />
  );
};
