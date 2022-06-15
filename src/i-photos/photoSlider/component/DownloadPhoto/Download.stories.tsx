import DownloadLink from "./Link";
import DownloadIconBtn from "./Icon";

export default {
  component: DownloadLink,
  title: "Component/Download",
};

export const Link = () => {
  return (
    <DownloadLink
      userUid="userUid"
      googleDriveId="googleDriveId"
      imageExtension="jpeg"
      downloadPhotoUrl="https://bule.com"
    />
  );
};

export const Icon = () => {
  return (
    <div className="p-2 bg-black">
      <DownloadIconBtn
        userUid="userUid"
        googleDriveId="googleDriveId"
        imageExtension="jpeg"
        downloadPhotoUrl="https://bule.com"
        placement="bottom"
      />
    </div>
  );
};
