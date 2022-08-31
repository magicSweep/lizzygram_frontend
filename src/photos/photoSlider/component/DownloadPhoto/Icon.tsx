import React, { FC } from "react";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import { DownloadPhotoProps } from "./types";
import { makeDownloadPhotoData } from "./DownloadPhoto.helper";

/* export type DownloadPhotoProps = {
    userUid: string,
    googleDriveId: string,
    downloadPhotoUrl: string
} */

export const DownloadPhotoIcon: FC<DownloadPhotoProps> = ({
  //userUid,
  googleDriveId,
  imageExtension,
  downloadPhotoUrl,
  placement,
  token,
}) => {
  const { downloadAttr, href } = makeDownloadPhotoData(
    googleDriveId,
    //userUid,
    imageExtension as any,
    downloadPhotoUrl,
    token
  );

  console.log("RENDER DOWNLOAD WIDGET", token);

  return (
    <Tooltip title="Скачать оригинальный файл" placement={placement}>
      <IconButton
        aria-label="скачать фото"
        /* className="m-auto" */
        component="a"
        download={downloadAttr}
        href={href}
      >
        <CloudDownloadIcon sx={{ fill: "white" }} fontSize="small" />
      </IconButton>
    </Tooltip>
  );
};

export default DownloadPhotoIcon;
