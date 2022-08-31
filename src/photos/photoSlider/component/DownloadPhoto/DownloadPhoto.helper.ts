//import { downloadPhotoUrl } from "../../config";
import { ImgExt } from "lizzygram-common-data/dist/types";
import {
  makeDownloadPhotoName as makeDownloadPhotoName_,
  makeDownloadPhotoUrl as makeDownloadPhotoUrl_,
} from "../../../../utils/app";
import { DownloadOriginalPhotoData } from "./types";

export const makeDownloadPhotoData_ =
  (
    makeDownloadPhotoUrl: typeof makeDownloadPhotoUrl_,
    makeDownloadPhotoName: typeof makeDownloadPhotoName_
  ) =>
  (
    googleDriveId: string,
    //userUid: string,
    imageExtension: ImgExt,
    downloadPhotoUrl: string,
    token: string
  ): DownloadOriginalPhotoData => {
    const photoFileName = makeDownloadPhotoName(imageExtension);

    return {
      href: makeDownloadPhotoUrl(
        googleDriveId,
        //userUid,
        downloadPhotoUrl,
        photoFileName,
        token
      ),
      downloadAttr: photoFileName,
    };
  };

export const makeDownloadPhotoData = makeDownloadPhotoData_(
  makeDownloadPhotoUrl_,
  makeDownloadPhotoName_
);
