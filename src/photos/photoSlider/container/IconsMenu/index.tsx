import React, { FC, useState, ComponentProps, useContext } from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DescriptionIcon from "@mui/icons-material/Description";
import Tooltip from "@mui/material/Tooltip";
//import { DownloadPhotoProps } from "../../component/DownloadPhoto/types";
import DownloadPhotoIcon from "../DownloadPhoto/Icon";
import FavoriteIconBtn from "../FavoriteIconBtn";
import { usePhotoSliderContext } from "../../hook/usePhotoSliderContext";

/* export type IconsMenuProps = Omit<
  ComponentProps<typeof FavoriteIconBtn>,
  "add" | "remove" | "favoriteReqs"
> &
  DownloadPhotoProps & {
    onToggleDesc: any;
    showEditPhotoForm: any;
    isEditor: boolean;
    isEditable: boolean;
  }; */

export type IconsMenuProps /* DownloadPhotoProps &
  Pick<ComponentProps<typeof FavoriteIconBtn>, "photoId" | "favoriteBy"> & {
    //downloadPhotoProps: DownloadPhotoProps;
    //favoriteIconBtnProps: ComponentProps<typeof FavoriteIconBtn>; */ = {
  onToggleDesc: any;
  //showEditPhotoForm: any;
  //isEditor: boolean;
  //isEditable: boolean;
};

const IconsMenu: FC = () => {
  const {
    isEditor,
    isEditableActivePhoto: isEditable,
    showEditPhotoForm,
    toggleDesc,
  } = usePhotoSliderContext();

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  //const useFavoriteReturn = useFavorite(downloadPhotoProps.userUid);

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
            <FavoriteIconBtn
              placement="left"
              /* favoriteBy={favoriteBy}
              userUid={downloadPhotoProps.userUid}
              photoId={photoId}
              {...useFavoriteReturn} */
            />
          </MenuItem>
        )}

        <MenuItem
          //key={option}
          //selected={option === "Pyxis"}
          onClick={handleClose}
        >
          <Tooltip title="Описание" placement="left">
            <IconButton aria-label="описание фото" onClick={toggleDesc}>
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
              /*  userUid={userUid}
              googleDriveId={googleDriveId}
              imageExtension={imageExtension} */
              placement="left"
              /*  {...downloadPhotoProps} */
              /* downloadPhotoUrl={downloadPhotoUrl} */
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
