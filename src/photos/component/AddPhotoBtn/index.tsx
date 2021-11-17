import React, { lazy, Suspense } from "react";
import { useEditor } from "../../../auth/hook/useEditor";

import AddPhotoBtnWidget from "./AddPhotoBtn";

const AddPhotoBtn = () => {
  const { user } = useEditor();

  if (user === null || user === undefined) return null;

  if (user.isEditor !== true) return null;

  return <AddPhotoBtnWidget />;
};

export default AddPhotoBtn;
