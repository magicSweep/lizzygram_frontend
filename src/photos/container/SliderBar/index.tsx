import React, { FC } from "react";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DescriptionIcon from "@mui/icons-material/Description";
import CloseIcon from "@mui/icons-material/Close";
import Tooltip from "@mui/material/Tooltip";
//import GetAppIcon from "@material-ui/icons/GetApp";
//import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import { DownloadPhotoProps } from "../../component/DownloadPhoto/types";
import ZoomBtn, { ZoomBtnProps } from "../ZoomBtn";
//import { DownloadOriginalPhotoData } from "../../types";
import DownloadPhotoIcon from "../../component/DownloadPhoto/Icon";

export interface SliderBarProps extends ZoomBtnProps, DownloadPhotoProps {
  isEditable: boolean;
  //downloadPhotoData: DownloadOriginalPhotoData;
  showEditPhotoForm: () => void;
  onClose: (event: any) => void;
  onToggleDesc: (event: any) => void;
}

const ItemWrapper = ({ children }: { children: any }) => {
  return <div className="w-12 h-12 mr-1.5">{children}</div>;
};

const SliderBar: FC<SliderBarProps> = ({
  onClose,
  onToggleDesc,
  isEditable,
  showEditPhotoForm,
  userUid,
  googleDriveId,
  imageExtension,
  ...props
}) => {
  /* left: 0;
  position: absolute;
  right: 0;
  top: 0;
  height: 72px;
  background-color: transparent; */
  return (
    <div className="absolute top-0 left-0 right-0 h-18 bg-transparent z-50">
      <div className="absolute w-full shadow-none top-0 h-16 slider-bar-gradient"></div>
      <div className="absolute top-0 right-0 left-0 z-50 py-0 px-3 flex items-center justify-between h-16">
        <ItemWrapper>
          <IconButton onClick={onClose} aria-label="закрыть фото слайдер">
            <CloseIcon sx={{ fill: "white" }} />
          </IconButton>
        </ItemWrapper>
        <div className="flex-grow flex justify-end items-center">
          <ItemWrapper>
            <ZoomBtn {...props} />
          </ItemWrapper>

          {/* <ItemWrapper>
            <Tooltip title="Скачать оригинальный файл">
              <IconButton
                aria-label="скачать фото"
                href={downloadOriginalPhotoUrl}
              >
                <CloudDownloadIcon sx={{ fill: "white" }} fontSize="small" />
              </IconButton>
            </Tooltip>
          </ItemWrapper> */}
          <ItemWrapper>
            <DownloadPhotoIcon
              userUid={userUid}
              googleDriveId={googleDriveId}
              imageExtension={imageExtension}
            />
          </ItemWrapper>

          {isEditable && (
            <ItemWrapper>
              <Tooltip title="Редактировать">
                <IconButton
                  onClick={showEditPhotoForm}
                  aria-label="изменить фото"
                >
                  <EditIcon sx={{ fill: "white" }} fontSize="small" />
                </IconButton>
              </Tooltip>
            </ItemWrapper>
          )}

          <ItemWrapper>
            <Tooltip title="Описание">
              <IconButton aria-label="описание фото" onClick={onToggleDesc}>
                <DescriptionIcon sx={{ fill: "white" }} fontSize="small" />
              </IconButton>
            </Tooltip>
          </ItemWrapper>
        </div>
      </div>
    </div>
  );
};

export default SliderBar;
