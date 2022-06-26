import React, { FC } from "react";
import DownloadIconBtn from "../../component/DownloadPhoto/Icon";
import { DownloadPhotoProps } from "../../component/DownloadPhoto/types";
import { usePhotoSliderContext } from "../../hook/usePhotoSliderContext";

/* export type DownloadPhotoProps = {
    userUid: string,
    googleDriveId: string,
    downloadPhotoUrl: string
} */

export const DownloadPhotoIcon: FC<{
  placement: DownloadPhotoProps["placement"];
}> = ({ placement }) => {
  const {
    // userUid,
    activePhoto: { imageExtension, googleDriveId },
    downloadPhotoUrl,
  } = usePhotoSliderContext();

  return (
    <DownloadIconBtn
      //userUid={userUid}
      googleDriveId={googleDriveId}
      imageExtension={imageExtension}
      downloadPhotoUrl={downloadPhotoUrl}
      placement={placement}
    />
  );
};

export default DownloadPhotoIcon;
