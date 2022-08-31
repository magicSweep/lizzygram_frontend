import React, { FC } from "react";
import { useTokenContext } from "../../../../auth/hook/useTokenContext";
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

  const token = useTokenContext();

  return (
    <DownloadIconBtn
      //userUid={userUid}
      googleDriveId={googleDriveId}
      imageExtension={imageExtension}
      downloadPhotoUrl={downloadPhotoUrl}
      placement={placement}
      token={token}
    />
  );
};

export default DownloadPhotoIcon;
