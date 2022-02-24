import React, { FC } from "react";
import { makeDownloadPhotoUrl } from "../../../utils/app";
import { downloadPhotoUrl } from "../../../config";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import { DownloadPhotoProps } from "./types";
import { makeDownloadPhotoData } from "../../helper";

/* export type DownloadPhotoProps = {
    userUid: string,
    googleDriveId: string,
    downloadPhotoUrl: string
} */

export const DownloadPhotoIcon: FC<DownloadPhotoProps> = ({
  userUid,
  googleDriveId,
  imageExtension,
}) => {
  const { downloadAttr, href } = makeDownloadPhotoData(
    googleDriveId,
    userUid,
    imageExtension
  );

  return (
    <Tooltip title="Скачать оригинальный файл">
      <IconButton
        aria-label="скачать фото"
        className="m-auto"
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
