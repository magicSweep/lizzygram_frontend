import React, { FC } from "react";
import { Photo, FirestoreDate } from "../../types";
import { makeDownloadPhotoUrl } from "../../../utils/app";
/* import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
 */ import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import EditIcon from "@mui/icons-material/Edit";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import WallOfPhotosImg from "../../../component/images/WallOfPhotosImg";
import DescTooltipedIcon from "../DescTooltipedIcon";

export interface PhotoCardProps {
  photo: Photo<FirestoreDate>;
  isEditable: boolean;
  index: number;
  onImageClick?: (event: any) => void | undefined;
  showEditPhotoForm: () => void;
  //observerIndex?: number;
  //observerId?: string;
  //isRender?: boolean;
}

const PhotoCard: FC<PhotoCardProps> = ({
  photo,
  isEditable,
  index,
  showEditPhotoForm,
  onImageClick,
  //observerIndex,
  //observerId,
  //isRender,
}) => {
  /* if (isRender === false) {
    return (
      <div
        className="relative w-345 bg-black h-194 rounded-sm shadow-md"
        data-observer-index={observerIndex}
        id={observerId}
      ></div>
    );
  } */

  /* const showEditPhotoForm =
    activePhoto === undefined
      ? () => {}
      : () => dispatch(editPhotoStartRequestAC(activePhoto.id)); */
  /* const onShowEditPhotoForm = (event: any) => {
    showEditPhotoForm();
  }; */

  //console.log("PHOTO CARD", photo.photo.date);

  const date: Date = photo.date.toDate();

  //const formatedDate = `${getAlphabetMonth(date)}, ${date.getFullYear()}`;

  const downloadOriginalPhotoUrl = makeDownloadPhotoUrl(
    photo.googleDriveId,
    photo.imageExtention
  );

  return (
    <div className="relative w-345 bg-photocard h-194 flex items-center justify-center rounded-sm shadow-md">
      <WallOfPhotosImg
        base64={photo.base64}
        src={photo.iconSrc}
        srcSet={""}
        data-index={index}
        photoAspectRatio={photo.aspectRatio}
        onClick={onImageClick}
      />
      <div className="absolute left-0 right-0 bottom-0 bg-photocard opacity-50 flex items-center justify-between h-12">
        <span className="flex">
          {isEditable === true && (
            <Tooltip title="Редактировать">
              <IconButton
                onClick={showEditPhotoForm}
                aria-label="edit photo"
                sx={{ ml: "14px" }}
              >
                <EditIcon sx={{ fill: "white" }} fontSize="small" />
              </IconButton>
            </Tooltip>
          )}

          <Tooltip title="Скачать оригинальный файл">
            <IconButton
              aria-label="скачать фото"
              sx={{ ml: "14px" }}
              href={downloadOriginalPhotoUrl}
            >
              <CloudDownloadIcon sx={{ fill: "white" }} fontSize="small" />
            </IconButton>
          </Tooltip>
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

/* import React, { FC } from "react";
import { Photo, FirestoreDate } from "../../types";
import { getAlphabetMonth, makeDownloadPhotoUrl } from "../../../utils/app";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import EditIcon from "@mui/icons-material/Edit";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import WallOfPhotosImg from "../../../component/images/WallOfPhotosImg";

export interface PhotoCardProps {
  photo: Photo<FirestoreDate>;
  isEditable: boolean;
  index: number;
  onImageClick?: (event: any) => void | undefined;
  showEditPhotoForm: (photo: Photo<FirestoreDate>) => void;
  observerIndex?: number;
  observerId?: string;
  isRender?: boolean;
}

export interface PhotoCardWithoutDescProps extends PhotoCardProps {
  children?: any;
  collapseBtn?: any;
}

const PhotoCardWithoutDesc: FC<PhotoCardWithoutDescProps> = ({
  photo,
  isEditable,
  index,
  showEditPhotoForm,
  onImageClick,
  observerIndex,
  observerId,
  isRender,
  collapseBtn,
  children,
  ...props
}) => {
  if (isRender === false) {
    return (
      <Card
        className="w-345 min-h-330 mr-6 mb-24"
        data-observer-index={observerIndex}
        id={observerId}
      ></Card>
    );
  }

  const onShowEditPhotoForm = (event: any) => {
    showEditPhotoForm(photo);
  };

  //console.log("PHOTO CARD", photo.photo.date);

  const date: Date = photo.date.toDate();

  const formatedDate = `${getAlphabetMonth(date)}, ${date.getFullYear()}`;

  const downloadOriginalPhotoUrl = makeDownloadPhotoUrl(
    photo.googleDriveId,
    photo.imageExtention
  );

  return (
    <Card
      className="w-345 min-h-330 mr-6 mb-24"
      data-observer-index={observerIndex}
      id={observerId}
    >
      <CardHeader
        avatar={
          <Avatar
            aria-label="recipe"
            sx={{ backgroundColor: "secondary.main" }}
          >
            {photo.yearsOld}
          </Avatar>
        }
        /* action={
              <IconButton aria-label="settings">
                <MoreVertIcon />
              </IconButton>
            } /
        title={formatedDate}
        //subheader="2 года"
      />

      <div className="w-full bg-black h-194 flex items-center justify-center">
        <WallOfPhotosImg
          height="194px"
          width="345px"
          base64={photo.base64}
          src={photo.iconSrc}
          srcSet={""}
          data-index={index}
          photoAspectRatio={photo.aspectRatio}
          onClick={onImageClick}
        />
      </div>

      <CardActions disableSpacing>
        {isEditable && (
          <Tooltip title="Редактировать">
            <IconButton
              color="secondary"
              onClick={onShowEditPhotoForm}
              aria-label="edit photo"
            >
              <EditIcon />
            </IconButton>
          </Tooltip>
        )}
        <Tooltip title="Скачать оригинальный файл">
          <IconButton
            color="secondary"
            aria-label="скачать фото"
            href={downloadOriginalPhotoUrl}
          >
            <CloudDownloadIcon />
          </IconButton>
        </Tooltip>

        {collapseBtn}
      </CardActions>
      {children}
    </Card>
  );
};

export default PhotoCardWithoutDesc;
 */
