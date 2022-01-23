import React from "react";
import { useSelector } from "react-redux";
import ModalFallback from "../../../component/ModalFallback";
import { GlobalState } from "../../../types";
import loadable from "@loadable/component";

const LoadableModalSearchPhotoForm = loadable(
  () => import("./ModalSearchPhotoForm"),
  {
    fallback: <ModalFallback />,
  }
);

let isInit = false;

export const SearchPhotoForm = () => {
  //console.log("[RENDER WALL_OF_PHOTS]");

  const isShow = useSelector<GlobalState, boolean>(
    (state) => state.search.showForm
  );

  if (isShow === true && isInit === false) isInit = true;

  if (isInit === false) return null;

  return <LoadableModalSearchPhotoForm isShow={isShow} />;
};

export default SearchPhotoForm;
