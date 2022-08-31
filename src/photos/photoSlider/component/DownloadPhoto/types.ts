import { TooltipProps } from "@mui/material";
import { ImgExt } from "lizzygram-common-data/dist/types";
//import { DownloadOriginalPhotoData } from "../../types";

/*export type DownloadPhotoProps = {
  userUid: string;
  googleDriveId: string;
  imageExtension: string; 
};*/

export type DownloadPhotoProps = {
  googleDriveId: string;
  //userUid: string;
  imageExtension: ImgExt | "";
  downloadPhotoUrl: string;
  placement?: TooltipProps["placement"];
  token: string;
};

export type DownloadOriginalPhotoData = {
  href: string;
  downloadAttr: string;
};
