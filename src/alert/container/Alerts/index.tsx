import React, { lazy, Suspense } from "react";
import { useSelector } from "react-redux";
//import WallOfPhotos from "./WallOfPhotos";
import { GlobalState } from "../../../types";

const LoadableAlerts = lazy(() => import("./Alerts"));

let isInit = false;

export const AlertsLoadableWrapper = () => {
  const { items } = useSelector((state: GlobalState) => state.alert);

  //console.log("[RENDER WALL_OF_PHOTS]");
  if (isInit === false && items.length > 0) {
    isInit = true;
  }

  if (isInit === false) return null;

  return (
    <Suspense fallback={null}>
      <LoadableAlerts items={items} />
    </Suspense>
  );
};

export default AlertsLoadableWrapper;
