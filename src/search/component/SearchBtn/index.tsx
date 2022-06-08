import React, { FC } from "react";
//import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import SearchIcon from "@mui/icons-material/Search";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import CloseIcon from "@mui/icons-material/Close";

// type
// change - root bg, fontColor of typography and all btns

export interface SearchBtnProps {
  //isAuth: boolean;
  isSearch: boolean;
  resetSearchState: () => void;
  showSearchPhotoForm: () => void;
}

const SearchBtn: FC<SearchBtnProps> = ({
  //isAuth,
  isSearch,
  resetSearchState,
  showSearchPhotoForm,
}) => {
  //if (!isAuth) return null;

  //const classes = useStyles();

  return (
    <div className="absolute h-full w-full flex justify-center items-center">
      <Tooltip title="Поиск фото">
        <IconButton
          edge="start"
          //className={classes.menuButton}
          color="inherit"
          aria-label="menu"
          onClick={showSearchPhotoForm}
        >
          <SearchIcon sx={{ color: "white" }} fontSize="small" />
        </IconButton>
      </Tooltip>

      {isSearch && (
        <Tooltip title="Отменить поиск">
          <IconButton
            edge="start"
            //className={classes.menuButton}
            color="inherit"
            aria-label="menu"
            onClick={resetSearchState}
          >
            <CloseIcon
              sx={{ width: "12px", height: "12px", color: "white" }}
              fontSize="small"
            />
          </IconButton>
        </Tooltip>
      )}
    </div>
  );
};

export default SearchBtn;
