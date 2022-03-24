import { MutableRefObject, useEffect, useRef, useState } from "react";
import { compose, Done, NI_Next, chain, elif, fold } from "fmagic";

// If we add element id - it check for fullscreen that element
// If not - check if any element is fullscreen
export const isFullscreen_ = (fullscreenElemId?: string) =>
  compose<void, boolean>(
    () =>
      document.fullscreenElement === null ? Done.of(false) : NI_Next.of(true),
    chain(
      elif(
        () => fullscreenElemId === undefined,
        () => NI_Next.of(true),
        () =>
          document.fullscreenElement.id === fullscreenElemId
            ? NI_Next.of(true)
            : Done.of(false)
      )
    ),
    fold(
      () => false,
      () => true
    )
  )();

const useFullscreenElem = (
  //fullscreenElemRef: MutableRefObject<HTMLElement>,
  onEnterFullscreen?: () => void,
  onExitFullscreen?: () => void
) => {
  const [isFullscreen, setIsFullscreen] = useState(false);

  const fullscreenElemRef: MutableRefObject<HTMLElement> = useRef();

  const fullscreenChangeHandler = () => {
    const isFullscreen = isFullscreen_(fullscreenElemRef.current.id);
    setIsFullscreen(isFullscreen);

    if (isFullscreen === true) {
      if (onEnterFullscreen !== undefined) onEnterFullscreen();
    } else {
      if (onExitFullscreen !== undefined) onExitFullscreen();
    }
  };

  /*  const exitFullscreenHandler = (event: any) => {
    console.log(
      "FULLSCREEN CHANGE",
      isFullscreen_(fullscreenElemRef.current.id)
    );
    onExitFullscreen();
  }; */

  useEffect(() => {
    //console.log("---------------REF", ref.current.id === "");
    if (
      fullscreenElemRef.current === null ||
      fullscreenElemRef.current.id === ""
    ) {
      throw new Error("We need id attribute on fullscreen element...");
    } else {
      fullscreenElemRef.current.addEventListener(
        "fullscreenchange",
        fullscreenChangeHandler
      );
    }

    return () => {
      if (
        fullscreenElemRef.current !== null &&
        fullscreenElemRef.current !== undefined
      ) {
        fullscreenElemRef.current.removeEventListener(
          "fullscreenchange",
          fullscreenChangeHandler
        );
      }
    };
  }, []);

  const toggleFullscreen = () => {
    // || document.fullscreenElement.id === ref.current.id

    const isFullscreen = isFullscreen_(fullscreenElemRef.current.id);

    if (isFullscreen === null)
      /* document.body */ fullscreenElemRef.current.requestFullscreen();
    else {
      document.exitFullscreen();
    }
  };

  const requestFullscreen = () => {
    // || document.fullscreenElement.id === ref.current.id
    if (document.fullscreenElement === null)
      /* document.body */ fullscreenElemRef.current.requestFullscreen();
  };

  const exitFullscreen = () => {
    // || document.fullscreenElement.id === ref.current.id
    if (isFullscreen_(fullscreenElemRef.current.id) === true) {
      document.exitFullscreen();
    }
  };

  return {
    toggleFullscreen,
    requestFullscreen,
    exitFullscreen,
    isFullscreen,
    fullscreenElemRef,
  };
};

export default useFullscreenElem;
