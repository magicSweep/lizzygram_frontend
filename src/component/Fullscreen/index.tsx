import React, { FC } from "react";
import FullscreenIcon from "@mui/icons-material/Fullscreen";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";

/* export const toggleFullscreen = () => {
  /* console.log(
        "----------FULLSCREEN",
        document.fullscreenElement,
        document.fullscreenElement ? document.fullscreenElement.id : null
      ); /
  if (document.fullscreenElement === null) document.body.requestFullscreen();
  else document.exitFullscreen();
};

export const exitFullscreen = () => {
  if (document.fullscreenElement !== null) document.exitFullscreen();
}; */

/* export const useFullscreen = (ref: MutableRefObject<HTMLElement>) => {
    useEffect(() => {
        if(ref.current === null || ref.current.id === "");
    }, [])
}; */

export type FullscreenProps = {
  isFullscreen: boolean;
  requestFullscreen: any;
  exitFullscreen: any;
};

export const Fullscreen: FC<FullscreenProps> = ({
  exitFullscreen,
  requestFullscreen,
  isFullscreen,
}) => {
  const onClick = isFullscreen === true ? exitFullscreen : requestFullscreen;

  const title = isFullscreen === true ? "В окне" : "Во весь экран";

  return (
    <Tooltip title={title}>
      <IconButton onClick={onClick} aria-label="во весь экран">
        <FullscreenIcon sx={{ fill: "white" }} fontSize="small" />
      </IconButton>
    </Tooltip>
  );
};

export default Fullscreen;
