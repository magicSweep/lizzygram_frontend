import React, { FC, useState } from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";
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
import Fullscreen, { FullscreenProps } from "../../../component/Fullscreen";
import Orientation from "../../../component/Orientation";
//import Favorite from "../../../component/Favorite";
import { Photo, FirestoreDate } from "lizzygram-common-data/dist/types";
import PhotoFavorite, {
  PhotoFavoriteProps,
} from "../../component/PhotoFavorite";

export type IconsMenuProps = PhotoFavoriteProps &
  DownloadPhotoProps & {
    onToggleDesc: any;
    showEditPhotoForm: any;
    isEditor: boolean;
    isEditable: boolean;
  };

const IconsMenu: FC<IconsMenuProps> = ({
  userUid,
  showEditPhotoForm,
  onToggleDesc,
  googleDriveId,
  imageExtension,
  isEditor,
  isEditable,
  ...props
}) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <IconButton
        aria-label="more"
        id="long-button"
        aria-controls={open ? "long-menu" : undefined}
        aria-expanded={open ? "true" : undefined}
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVertIcon sx={{ fill: "white" }} fontSize="small" />
      </IconButton>
      <Menu
        id="long-menu"
        MenuListProps={{
          "aria-labelledby": "long-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        PaperProps={{
          style: {
            //maxHeight: ITEM_HEIGHT * 4.5,
            //width: "20ch",
            //width: "60px",
            backgroundColor: "#424242",
          },
        }}
      >
        {isEditor === true && (
          <MenuItem
            //key={option}
            //selected={option === "Pyxis"}
            onClick={handleClose}
          >
            <PhotoFavorite
              userUid={userUid}
              placement="left"
              {...props}
              /* addFavorite={addFavorite}
                removeFavorite={removeFavorite}
                favoriteReqs={favoriteReqs}
                favoriteBy={photos[activeIndex].favoriteBy}
                photoId={photos[activeIndex].id}
                userUid={userUid} */
            />
          </MenuItem>
        )}

        <MenuItem
          //key={option}
          //selected={option === "Pyxis"}
          onClick={handleClose}
        >
          <Tooltip title="Описание" placement="left">
            <IconButton aria-label="описание фото" onClick={onToggleDesc}>
              <DescriptionIcon sx={{ fill: "white" }} fontSize="small" />
            </IconButton>
          </Tooltip>
        </MenuItem>

        {isEditor === true && (
          <MenuItem
            //key={option}
            //selected={option === "Pyxis"}
            onClick={handleClose}
          >
            <DownloadPhotoIcon
              userUid={userUid}
              googleDriveId={googleDriveId}
              imageExtension={imageExtension}
              placement="left"
            />
          </MenuItem>
        )}

        {isEditor === true && isEditable === true && (
          <MenuItem
            //key={option}
            //selected={option === "Pyxis"}
            onClick={handleClose}
          >
            <Tooltip title="Редактировать" placement="left">
              <IconButton
                onClick={showEditPhotoForm}
                aria-label="изменить фото"
              >
                <EditIcon sx={{ fill: "white" }} fontSize="small" />
              </IconButton>
            </Tooltip>
          </MenuItem>
        )}
      </Menu>
    </div>
  );
};

export default IconsMenu;
