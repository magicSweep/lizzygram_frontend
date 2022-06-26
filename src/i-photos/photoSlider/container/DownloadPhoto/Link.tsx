import React, { FC } from "react";
import DownloadLink from "../../component/DownloadPhoto/Link";
import { DownloadPhotoProps } from "../../component/DownloadPhoto/types";
//import { PhotoSliderContext } from "../PhotoSlider/PhotoSlider.provider";
import { usePhotoSliderContext } from "../../hook/usePhotoSliderContext";

/* export type DownloadPhotoProps = {
    userUid: string,
    googleDriveId: string,
    downloadPhotoUrl: string
} */

export const DownloadPhotoIcon: FC<{
  placement?: DownloadPhotoProps["placement"];
}> = ({ placement }) => {
  const {
    //userUid,
    activePhoto: { imageExtension, googleDriveId },
    downloadPhotoUrl,
  } = usePhotoSliderContext();

  return (
    <DownloadLink
      //userUid={userUid}
      googleDriveId={googleDriveId}
      imageExtension={imageExtension}
      downloadPhotoUrl={downloadPhotoUrl}
      placement={placement}
    />
  );
};

export default DownloadPhotoIcon;
