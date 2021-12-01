import React from "react";
/* import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import SearchIcon from "@material-ui/icons/Search";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import CloseIcon from "@material-ui/icons/Close"; */
import { useSearchBtn } from "./hook";
import SearchBtnWidget from "./SearchBtnWidget";

// type
// change - root bg, fontColor of typography and all btns

//export interface SearchBtnProps {}

const SearchBtn = () => {
  const {
    //isAuth,
    isSearch,
    resetSearchState,
    showSearchPhotoForm,
  } = useSearchBtn();

  //if (isAuth === undefined) return null;

  //const classes = useStyles();

  return (
    <SearchBtnWidget
      //isAuth={isAuth}
      isSearch={isSearch}
      resetSearchState={resetSearchState}
      showSearchPhotoForm={showSearchPhotoForm}
    />
  );
};

export default SearchBtn;
