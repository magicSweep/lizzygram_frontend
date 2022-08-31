import React, { FC } from "react";
import { useTokenContext } from "../../../../auth/hook/useTokenContext";
import DownloadIconBtn from "../../../photoSlider/component/DownloadPhoto/Icon";
import { DownloadPhotoProps } from "../../../photoSlider/component/DownloadPhoto/types";

/* export type DownloadPhotoProps = {
    userUid: string,
    googleDriveId: string,
    downloadPhotoUrl: string
} */

export const DownloadPhotoIcon: FC<Omit<DownloadPhotoProps, "token">> = (
  props
) => {
  const token = useTokenContext();

  console.log("RENDER DOWNLOAD ICON", token);

  return (
    <DownloadIconBtn
      //userUid={userUid}
      {...props}
      token={token}
    />
  );
};

export default DownloadPhotoIcon;
