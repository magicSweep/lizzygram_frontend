import React, { useCallback } from "react";
import { useDispatch } from "react-redux";
import { addPhotoRequestStartAC } from "../../../store";
import AddBtn from "./../../../../../component/AddBtn";
import { useEditor } from "../../../../../auth/hook/useEditor";
import Fade from "@mui/material/Fade";
import { useLayoutActionsContext } from "../../../../../hook/useLayoutActionsContext";
//import { useScrollTriggerContext } from "../../../../../hook/useScrollTriggerContext";

export const AddPhotoBtn = () => {
  const { showElements } = useLayoutActionsContext();

  const dispatch = useDispatch();

  const startAddPhotoRequest = useCallback(() => {
    dispatch(addPhotoRequestStartAC());
  }, []);

  return (
    <Fade /* appear={false} */ in={showElements}>
      <span>
        <AddBtn onClick={startAddPhotoRequest} />
      </span>
    </Fade>
  );
};

const AddPhotoBtnFinal = () => {
  const { user } = useEditor();

  if (user === null || user === undefined) return null;

  if (user.isEditor !== true) return null;

  return <AddPhotoBtn />;
};

export default AddPhotoBtnFinal;
