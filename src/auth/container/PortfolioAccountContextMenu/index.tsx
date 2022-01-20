import * as React from "react";
//import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
//import Divider from "@mui/material/Divider";
//import Typography from "@mui/material/Typography";
import Logout from "@mui/icons-material/Logout";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import AccountContexMenu, {
  AccountContextMenuProps,
} from "./../AccountContexMenu";
import { useEditor } from "../../hook/useEditor";
import { usePermissions } from "../../hook/usePermissions";

export type PortfolioAccountContextMenuProps = AccountContextMenuProps & {
  isEditor: boolean | undefined;
  grantPermissions: () => Promise<void>;
  revokePermissions: () => Promise<void>;
};

const getAddPermissionsElem = (grantPermissions: () => Promise<void>) => {
  return (
    <MenuItem
      sx={{ minWidth: "170px", mt: "5px", color: "textPrimary" }}
      onClick={grantPermissions}
    >
      <ListItemIcon>
        <AddIcon fontSize="small" color="secondary" />
      </ListItemIcon>
      Получить права
    </MenuItem>
  );
};

const getRemovePermissionsElem = (revokePermissions: () => Promise<void>) => {
  return (
    <MenuItem
      sx={{ minWidth: "170px", mt: "5px", color: "textPrimary" }}
      onClick={revokePermissions}
    >
      <ListItemIcon>
        <RemoveIcon fontSize="small" color="secondary" />
      </ListItemIcon>
      Отозвать права
    </MenuItem>
  );
};

export const PortfolioAccountContextMenuWidget: React.FC<
  PortfolioAccountContextMenuProps
> = ({ isEditor, grantPermissions, revokePermissions, ...props }) => {
  const addOrRemovePermissionsElem =
    isEditor === undefined
      ? null
      : isEditor === true
      ? getRemovePermissionsElem(revokePermissions)
      : getAddPermissionsElem(grantPermissions);

  return (
    <AccountContexMenu childItems={addOrRemovePermissionsElem} {...props} />
  );
};

const PortfolioAccountContextMenu: React.FC<AccountContextMenuProps> = (
  props
) => {
  const {
    user: { isEditor },
  } = useEditor();
  const { grantPermissions, revokePermissions } = usePermissions();

  return (
    <PortfolioAccountContextMenuWidget
      isEditor={isEditor}
      grantPermissions={grantPermissions}
      revokePermissions={revokePermissions}
      {...props}
    />
  );
};

export default PortfolioAccountContextMenu;

/* import * as React from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import Logout from "@mui/icons-material/Logout";
import { AccountContextMenuProps } from "./../AccountContexMenu";

export type PortfolioAccountContextMenuProps = AccountContextMenuProps & {
  isEditor: boolean | undefined;
  grantPermissions: () => Promise<void>;
  revokePermissions: () => Promise<void>;
};

const getAddPermissionsElem = (grantPermissions: () => Promise<void>) => {
  return (
    <MenuItem
      sx={{ minWidth: "170px", mt: "5px", color: "textPrimary" }}
      onClick={grantPermissions}
    >
      <ListItemIcon>
        <Logout fontSize="small" color="secondary" />
      </ListItemIcon>
      Получить права
    </MenuItem>
  );
};

const getRemovePermissionsElem = (revokePermissions: () => Promise<void>) => {
  return (
    <MenuItem
      sx={{ minWidth: "170px", mt: "5px", color: "textPrimary" }}
      onClick={revokePermissions}
    >
      <ListItemIcon>
        <Logout fontSize="small" color="secondary" />
      </ListItemIcon>
      Отозвать права
    </MenuItem>
  );
};

const PortfolioAccountContextMenu: React.FC<
  PortfolioAccountContextMenuProps
> = ({
  userName,
  anchorEl,
  handleClose,
  logout,
  isEditor,
  grantPermissions,
  revokePermissions,
}) => {
  const open = Boolean(anchorEl);

  const addOrRemovePermissionsElem =
    isEditor === undefined
      ? null
      : isEditor === true
      ? getAddPermissionsElem(grantPermissions)
      : getRemovePermissionsElem(revokePermissions);

  return (
    <Menu
      anchorEl={anchorEl}
      open={open}
      onClose={handleClose}
      // onClick={onExit} 
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

      {addOrRemovePermissionsElem}

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

export default PortfolioAccountContextMenu;
 */
