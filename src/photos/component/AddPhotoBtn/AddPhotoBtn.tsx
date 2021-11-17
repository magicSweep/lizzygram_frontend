import React, { useCallback } from "react";
import { useDispatch } from "react-redux";
import { addPhotoStartRequestAC } from "../../store/action";
import AddPhotoIconBtnWidget from "./AddPhotoBtnWidget";

const AddPhotoBtn = () => {
  const dispatch = useDispatch();

  const startAddPhotoRequest = useCallback(() => {
    dispatch(addPhotoStartRequestAC());
  }, []);

  return <AddPhotoIconBtnWidget onClick={startAddPhotoRequest} />;
};

export default AddPhotoBtn;
