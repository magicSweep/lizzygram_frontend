import React, { useCallback } from "react";
import { useDispatch } from "react-redux";
import { addPhotoStartRequestAC } from "../../../store/action";
import AddBtn from "./../../../../../component/AddBtn";
import { useEditor } from "../../../../../auth/hook/useEditor";

export const AddPhotoBtn = () => {
  const dispatch = useDispatch();

  const startAddPhotoRequest = useCallback(() => {
    dispatch(addPhotoStartRequestAC());
  }, []);

  return <AddBtn onClick={startAddPhotoRequest} />;
};

const AddPhotoBtnFinal = () => {
  const { user } = useEditor();

  if (user === null || user === undefined) return null;

  if (user.isEditor !== true) return null;

  return <AddPhotoBtn />;
};

export default AddPhotoBtnFinal;
