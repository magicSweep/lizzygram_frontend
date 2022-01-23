import React from "react";
import { useSelector } from "react-redux";
//import WallOfPhotos from "./WallOfPhotos";
import { GlobalState } from "../../../types";
import loadable from "@loadable/component";

const LoadableAlerts = loadable(() => import("./Alerts"));

let isInit = false;

export const AlertsLoadableWrapper = () => {
  const { items } = useSelector((state: GlobalState) => state.alert);

  //console.log("[RENDER WALL_OF_PHOTS]");
  if (isInit === false && items.length > 0) {
    isInit = true;
  }

  if (isInit === false) return null;

  return <LoadableAlerts items={items} />;
};

export default AlertsLoadableWrapper;
