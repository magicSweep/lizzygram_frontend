/* import React, { memo, lazy, Suspense } from "react";
import { useSelector } from "react-redux";
import ModalFallback from "../../../component/ModalFallback";
import { GlobalState } from "../../../types";
import ProcessesManager from "../ProcessesManager";
//import loadable from "@loadable/component";

const selector = (state: GlobalState) => state.photos.addReqs.reqIds;

const AddPhotoManager = () => {
  return (
      <ProcessesManager Process={} selector={selector} />
  );
};

export default AddPhotoManager; */

import React, { memo, lazy, Suspense, useRef, FC } from "react";
import { useSelector } from "react-redux";
import ModalFallback from "../../../component/ModalFallback";
import { GlobalState } from "../../../types";
//import ProcessesManager from "../ProcessesManager";
//import loadable from "@loadable/component";

let init = false;

const useProcessManager = (selector: (state: any) => string[]) => {
  //const initRef = useRef(false);

  const processesIds = useSelector<GlobalState, string[]>(
    //(state) => state.photos.addReqs.reqIds
    selector
  );

  if (init === false && processesIds.length !== 0) {
    init = true;
  }

  return {
    doesRender: init,
    processesIds,
  };
};

export type ProcessesManagerProps = {
  //doesRender: boolean;
  selector: (state: any) => string[];
};

const LoadableAddPhotoManager = lazy(() => import("./AddPhotoManager"));

const AddPhotoManager: FC<ProcessesManagerProps> = ({ selector }) => {
  const { doesRender, processesIds } = useProcessManager(selector);

  /* const requests = useSelector<GlobalState, string[]>(
    (state) => state.photos.addReqs.reqIds
  );

  if (isInit === false) {
    if (requests.length === 0) return null;
    else isInit = true;
  } */

  if (doesRender === false) return null;

  return (
    <Suspense fallback={<ModalFallback />}>
      <LoadableAddPhotoManager processesIds={processesIds} />
    </Suspense>
  );
};

export default memo(AddPhotoManager);
