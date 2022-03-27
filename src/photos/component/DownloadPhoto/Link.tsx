import React, { FC } from "react";
import { makeDownloadPhotoUrl } from "../../../utils/app";
import { downloadPhotoUrl } from "../../../config";
import { DownloadPhotoProps } from "./types";
import Link from "@mui/material/Link";
import { makeDownloadPhotoData } from "../../helper";

export const DownloadPhotoLink: FC<DownloadPhotoProps> = ({
  userUid,
  googleDriveId,
  imageExtension,
}) => {
  const { downloadAttr, href } = makeDownloadPhotoData(
    googleDriveId,
    userUid,
    imageExtension as any
  );

  return (
    <Link download={downloadAttr} href={href}>
      Скачать
    </Link>
  );
};

export default DownloadPhotoLink;
