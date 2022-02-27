import React, { FC } from "react";
import { Photo, FirestoreDate } from "lizzygram-common-data/dist/types";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import EditIcon from "@mui/icons-material/Edit";
import WallOfPhotosImg from "../../../component/images/WallOfPhotosImg";
import DescTooltipedIcon from "../DescTooltipedIcon";
import DownloadPhotoIcon from "../DownloadPhoto/Icon";

export interface PhotoCardProps {
  photo: Photo<FirestoreDate>;
  //downloadPhotoData: DownloadOriginalPhotoData;
  userUid: string;
  isEditable: boolean;
  isEditor: boolean;
  index: number;
  onImageClick?: (event: any) => void | undefined;
  showEditPhotoForm: () => void;
}

const PhotoCard: FC<PhotoCardProps> = ({
  photo,
  isEditable,
  isEditor,
  index,
  userUid,
  showEditPhotoForm,
  onImageClick,
}) => {
  const date: Date = photo.date.toDate();

  return (
    <div className="relative w-345 bg-photocard h-194 overflow-hidden flex items-center justify-center rounded-sm shadow-md">
      <WallOfPhotosImg
        base64={photo.base64}
        src={photo.iconSrc}
        srcSet={""}
        data-index={index}
        photoAspectRatio={photo.aspectRatio}
        onClick={onImageClick}
        alt="Фотография"
      />
      <div className="absolute left-0 right-0 px-4 bottom-0 bg-photocard opacity-50 flex items-center justify-between h-12">
        <span className="flex">
          {isEditor === true && isEditable === true && (
            <Tooltip title="Редактировать">
              <IconButton
                onClick={showEditPhotoForm}
                aria-label="edit photo"
                //sx={{ ml: "14px" }}
              >
                <EditIcon sx={{ fill: "white" }} fontSize="small" />
              </IconButton>
            </Tooltip>
          )}

          {isEditor === true && (
            <DownloadPhotoIcon
              userUid={userUid}
              googleDriveId={photo.googleDriveId}
              imageExtension={photo.imageExtention}
            />
          )}
        </span>
        <DescTooltipedIcon
          date={date}
          desc={photo.description}
          photoTags={photo.tags}
        />
      </div>
    </div>
  );
};

export default PhotoCard;
