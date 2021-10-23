import * as React from "react";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import PersonAdd from "@mui/icons-material/PersonAdd";
import Settings from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";

export interface AccountContextMenuProps {
  userName: string;
  anchorEl: any;
  handleClose: (event?: any) => void;
  logout: (event?: any) => void;
}

const AccountContextMenu: React.FC<AccountContextMenuProps> = ({
  userName,
  anchorEl,
  handleClose,
  logout,
}) => {
  /* const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  }; */

  const open = Boolean(anchorEl);

  return (
    <Menu
      anchorEl={anchorEl}
      open={open}
      onClose={handleClose}
      /* onClick={onExit} */
      PaperProps={{
        elevation: 0,
        sx: {
          overflow: "visible",
          filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
          mt: 1.5,
          "& .MuiAvatar-root": {
            width: 32,
            height: 32,
            ml: -0.5,
            mr: 1,
          },
          "&:before": {
            content: '""',
            display: "block",
            position: "absolute",
            top: 0,
            right: 14,
            width: 10,
            height: 10,
            bgcolor: "background.paper",
            transform: "translateY(-50%) rotate(45deg)",
            zIndex: 0,
          },
        },
      }}
      transformOrigin={{ horizontal: "right", vertical: "top" }}
      anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
    >
      <Typography
        color="secondary"
        sx={{
          display: "block",
          textAlign: "center",
          pb: "20px",
          pt: "12px",
        }}
      >
        {userName}
      </Typography>

      <Divider />
      {/* <MenuItem>
          <ListItemIcon>
            <PersonAdd fontSize="small" />
          </ListItemIcon>
          Add another account
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          Settings
        </MenuItem> */}
      <MenuItem
        sx={{ minWidth: "170px", mt: "5px", color: "textPrimary" }}
        onClick={logout}
      >
        <ListItemIcon>
          <Logout fontSize="small" color="secondary" />
        </ListItemIcon>
        Выход
      </MenuItem>
    </Menu>
  );
};

export default AccountContextMenu;

/* import React, { FC } from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import Typography from "@mui/material/Typography";

export interface AccountContextMenuProps {
  userName: string;
  anchorEl: any;
  handleClose: (event?: any) => void;
  logout: (event?: any) => void;
}

export default function AccountContextMenu({
  userName,
  anchorEl,
  handleClose,
  logout,
}: AccountContextMenuProps) {
  const onExit = () => {
    logout();
    handleClose();
  };

  return (
    <>
      <Menu
        id="auth-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <div className="p-5">
          <Typography
            component="p"
            align="center"
            variant="body2"
            color="secondary"
          >
            {userName}
          </Typography>
        </div>
        <MenuItem onClick={onExit}>
          <ListItemIcon sx={{ minWidth: "34px" }}>
            <ExitToAppIcon color="secondary" fontSize="small" />
          </ListItemIcon>
          <ListItemText
            primary="Выход"
            primaryTypographyProps={{ variant: "body2" }}
          />
        </MenuItem>
      </Menu>
    </>
  );
}
 */
