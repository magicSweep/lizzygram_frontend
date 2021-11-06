import Button from "@mui/material/Button";
import Box from "@mui/system/Box";
import {
  Fragment,
  MutableRefObject,
  useEffect,
  useMemo,
  useRef,
  useState,
  Children,
  isValidElement,
  FC,
} from "react";
import ArrowControls from "../../component/ArrowControls";
import { useCarousel } from "./hook/useCarousel";
//import { photos } from "./../../../mock/fake.data";

export default {
  component: Fragment,
  title: "Carousel/SimpleCarousel",
  decorators: [],
  //decorators: [withKnobs],
  // Our exports that end in "Data" are not stories.
  excludeStories: /.*Data$/,
};

const items = [0, 1, 2, 3, 4, 5];

const SimpleCarousel = () => {
  const { activeIndex, increaseIndex, decreaseIndex, setIndex } = useCarousel(
    items.length,
    0
  );

  return (
    <>
      <Box width="700px" height="400px" className="relative m-auto bg-black">
        <Box className="w-full h-full bg-green-200 text-center pt-12">
          <p>Active index - {activeIndex}</p>
        </Box>
        <ArrowControls next={increaseIndex} prev={decreaseIndex} />
      </Box>
    </>
  );
};

export const Default = () => {
  return <SimpleCarousel />;
};

/* const calcPukWidth = (
  translateX: number,
  wrapperWidth: number,
  isIndexChanged: boolean
) => {
  if (isIndexChanged) return wrapperWidth;

  const maxWidth = wrapperWidth - 100;
  const absTranslateX = Math.abs(translateX);

  return absTranslateX >= maxWidth ? maxWidth : translateX;
};

export type PuksProps = {
  translateX: number;
  isTranslated: boolean;
  index: number;
};

export type PukProps = PuksProps & {
  fromLeft: boolean;
  wrapperWidth: number;
};

const Puk: FC<PukProps> = ({
  fromLeft,
  translateX,
  isTranslated,
  index,
  wrapperWidth,
}) => {
  const selfRef: MutableRefObject<HTMLElement> = useRef(null);
  const prevIndexRef: MutableRefObject<number> = useRef(index);

  const width = `${calcPukWidth(
    translateX,
    wrapperWidth,
    index === prevIndexRef.current
  )}px`;

  prevIndexRef.current = index;

  const onTransitionEnd = () => {
    const { width } = selfRef.current.getBoundingClientRect();

    if (width === wrapperWidth) {
      selfRef.current.style.width = "0";
    }
  };

  return (
    <Box
      ref={selfRef}
      className={`h-full bg-green-300 ${fromLeft === true ? "" : "ml-auto"}`}
      onTransitionEnd={onTransitionEnd}
      sx={{
        transitionProperty: isTranslated === true ? "none" : "width",
        transitionDuration: "300ms",
        width: `${width}%`,
      }}
    ></Box>
  );
};

const Puks: FC<PuksProps> = ({ translateX, isTranslated, index }) => {
  const wrapperRef: MutableRefObject<HTMLElement> = useRef(null);

  const wrapperWidth = useMemo(() => {
    return wrapperRef.current === null
      ? 0
      : wrapperRef.current.getBoundingClientRect().width;
  }, [isTranslated, index]);

  return (
    <div ref={wrapperRef as any} className="absolute inset-0">
      <Puk
        fromLeft={true}
        translateX={translateX > 0 ? translateX : 0}
        isTranslated={isTranslated}
        index={index}
        wrapperWidth={wrapperWidth}
      />
      <Puk
        fromLeft={false}
        translateX={translateX < 0 ? translateX : 0}
        isTranslated={isTranslated}
        index={index}
        wrapperWidth={wrapperWidth}
      />
    </div>
  );
};

const Anima = () => {
  const [width, setWidth] = useState(0);
  const [isIncrease, setIsIncrease] = useState(false);

  const {
    setIndex,
    increaseIndex,
    decreaseIndex,
    translateX,
    isTranslated,
    activeIndex,
    //onMouseUp,
    //onMouseMove,
    onMouseDown,
  } = useCarousel(5, 0);

  const increase = () => {
    setWidth(100);
    setIsIncrease(true);
  };

  const decrease = () => {
    setWidth(100);
    setIsIncrease(false);
  };

  const stop = () => setWidth(0);

  console.log("[RENDER ANIMA]", translateX);

  return (
    <Box>
      <Box
        className="relative"
        bgcolor="black"
        width="80vw"
        height="70vh"
        m="auto"
        onMouseDown={onMouseDown}
      >
        <div className="absolute inset-0">
          <Box
            className={`h-full bg-green-300 ${
              isIncrease === true ? "ml-auto" : ""
            }`}
            onTransitionEnd={() => (width === 100 ? setWidth(0) : null)}
            sx={{
              transitionProperty: "width",
              transitionDuration: "300ms",
              width: `${width}%`,
            }}
          ></Box>
        </div>
      </Box>
      <Box className="w-full flex justify-center">
        <Box className="flex m-auto justify-center items-center" width="200px">
          <Button onClick={decrease}>Prev</Button>
          <span> | </span>
          <Button onClick={stop}>Stop</Button>
          <span> | </span>
          <Button onClick={increase}>Next</Button>
        </Box>
      </Box>
    </Box>
  );
};
 */

/* export const Default = () => {
  return (
    <Box width="80vw" height="70vh" m="auto">
      <Wrapper />
    </Box>
  );
}; */

/* 
const Anima = () => {
  const [width, setWidth] = useState(0);
  const [isIncrease, setIsIncrease] = useState(false);

  const {
    setIndex,
    increaseIndex,
    decreaseIndex,
    translateX,
    isTranslated,
    activeIndex,
    //onMouseUp,
    //onMouseMove,
    onMouseDown,
  } = useCarousel(5, 0);

  const increase = () => {
    setWidth(100);
    setIsIncrease(true);
  };

  const decrease = () => {
    setWidth(100);
    setIsIncrease(false);
  };

  const stop = () => setWidth(0);

  console.log("[RENDER ANIMA]", translateX);

  return (
    <Box>
      <Box
        className="relative"
        bgcolor="black"
        width="80vw"
        height="70vh"
        m="auto"
        onMouseDown={onMouseDown}
      >
        <div className="absolute inset-0">
          <Box
            className={`h-full bg-green-300 ${
              isIncrease === true ? "ml-auto" : ""
            }`}
            onTransitionEnd={() => (width === 100 ? setWidth(0) : null)}
            sx={{
              transitionProperty: "width",
              transitionDuration: "300ms",
              width: `${width}%`,
            }}
          ></Box>
        </div>
      </Box>
      <Box className="w-full flex justify-center">
        <Box className="flex m-auto justify-center items-center" width="200px">
          <Button onClick={decrease}>Prev</Button>
          <span> | </span>
          <Button onClick={stop}>Stop</Button>
          <span> | </span>
          <Button onClick={increase}>Next</Button>
        </Box>
      </Box>
    </Box>
  );
};

const Wrapper = () => {
  return (
    <>
      <Box className="relative w-full h-full">
        <Box
          className="absolute inset-0 bg-red-300"
          sx={{
            transform: "translateX(-100%)",
          }}
        ></Box>
        <Box className="w-full h-full bg-green-300  "></Box>
        <Box
          className=" absolute inset-0 bg-blue-300"
          sx={{
            transform: "translateX(100%)",
          }}
        ></Box>
      </Box>

      {/* <Box className="w-full flex justify-center">
        <Box className="flex m-auto justify-center items-center" width="200px">
          <Button onClick={indexDecrease}>Prev</Button>
          <span> | </span>
          <Button onClick={indexIncrease}>Next</Button>
        </Box>

       
      </Box> /}
      </>
      );
    };
    
*/
