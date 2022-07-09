import { useEffect, useRef, useState } from "react";
//import { useWindowScroll } from "../useWindowScorll";

export const useLayoutActionsOnScroll = () => {
  const [state, setState] = useState({
    showElements: true,
    elevationAppBar: false,
  });

  const prevYRef = useRef(0);

  const stateRef = useRef(state);

  stateRef.current = state;

  const onWindowScroll = (event: any) => {
    //console.log("WINDOW SCROLL", prevYRef.current);
    const y = document.body.getBoundingClientRect().top;

    /*  setYScroll((prevY: number) => {
        prevYRef.current = prevY;
        return y;
      }); */

    let showElements = stateRef.current.showElements;
    let elevationAppBar = stateRef.current.elevationAppBar;

    if (y >= -40) {
      if (showElements === false) showElements = true;
    } else if (prevYRef.current > y) {
      // WE SCROLL DOWN
      //console.log("Hide");
      if (showElements === true) showElements = false;
      //isShowRef.current = false;
      /* if (isShowRef.current === true) isShowRef.current = false;
          else isShowRef.current = true; */
    } else {
      // WE SCROLL UP
      //console.log("Show");
      if (showElements === false) showElements = true;
      //isShowRef.current = true;
      /*  if (isShowRef.current === false) isShowRef.current = true;
          else isShowRef.current = false; */
    }

    if (y === 0) {
      elevationAppBar = false;
    } else {
      elevationAppBar = true;
    }

    if (
      stateRef.current.showElements !== showElements ||
      stateRef.current.elevationAppBar !== elevationAppBar
    ) {
      setState({
        showElements,
        elevationAppBar,
      });
    }

    /*  console.log(
      "ON WINDOW SCROLL",
      state,
      y,
      prevYRef.current,
      showElements,
      elevationAppBar
    ); */

    prevYRef.current = y;
  };

  //console.log("USE WINDOW SCROLL", state);

  useEffect(() => {
    window.addEventListener("scroll", onWindowScroll, false);

    return () => {
      window.removeEventListener("scroll", onWindowScroll, false);
    };
  }, []);

  return {
    ...state,
  };
};

/* export const useShowLayoutOnScroll = () => {
  //const [isShow, setIsShow] = useState(true);

  const isShowRef = useRef(true);

  const { y, prevY } = useWindowScroll();

  //&& isShowRef.current === false
  if (y >= -40) {
    isShowRef.current = true;
  } else if (prevY > y) {
    // WE SCROLL DOWN
    //console.log("Hide");
    isShowRef.current = false;
    /* if (isShowRef.current === true) isShowRef.current = false;
      else isShowRef.current = true; /
  } else {
    // WE SCROLL UP
    //console.log("Show");
    isShowRef.current = true;
    /*  if (isShowRef.current === false) isShowRef.current = true;
      else isShowRef.current = false; /
  }

  //console.log("USE SHOW LAYOUT ON SCROLL", y, prevY, isShowRef.current);

  return isShowRef.current;
}; */
