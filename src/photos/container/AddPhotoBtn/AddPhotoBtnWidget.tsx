import React from "react";
import AddIcon from "@mui/icons-material/Add";
//import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Button from "@mui/material/Button";

const AddPhotoBtnWidget = ({ onClick }: { onClick: (event?: any) => void }) => {
  return (
    <div className="fixed bottom-6 right-8 z-50">
      <Tooltip title="Добавить фото">
        <Button
          //edge="start"
          /* classes={{
            root: classes.btnRoot,
            label: classes.label,
          }}  */
          className="bg-secondary"
          sx={{
            borderRadius: "50%",
            width: "auto",
            height: "auto",
            minWidth: "auto",
            minHeight: "auto",
            padding: "13px",
            color: "white",
          }}
          //className={classes.button}
          color="secondary"
          aria-label="menu"
          onClick={onClick}
          variant="contained"
        >
          <AddIcon fontSize="medium" />
        </Button>
      </Tooltip>
    </div>
  );

  /* return (
    <div className={classes.root}>
      <Tooltip title="Добавить фото">
        <IconButton
          //edge="start"
          //className={classes.menuButton}
          color="secondary"
          aria-label="menu"
          onClick={onClick}
        >
          <AddIcon fontSize="large" color="secondary" />
        </IconButton>
      </Tooltip>
    </div>
  ); */
};

export default AddPhotoBtnWidget;
