import React, { memo, lazy, Suspense, useRef, FC } from "react";
//import { useSelector } from "react-redux";
import ModalFallback from "../../../../../component/ModalFallback";
//import { GlobalState } from "../../../../../types";
import useProcessesManager, {
  ProcessesManagerProps,
} from "../../../common/hook/useProcessesManager";
import { GlobalState } from "../../../../../types";

const LoadableEditPhotoManager = lazy(() => import("./EditPhotoManager"));

const processesIdsSelector = (state: GlobalState) =>
  state.addEditPhoto.editReqs.reqIds;

const EditPhotoManager: FC = () => {
  const { doesRender, processesIds } =
    useProcessesManager(processesIdsSelector);

  /* const requests = useSelector<GlobalState, string[]>(
    (state) => state.photos.EditReqs.reqIds
  );

  if (isInit === false) {
    if (requests.length === 0) return null;
    else isInit = true;
  } */

  if (doesRender === false) return null;

  return (
    <Suspense fallback={<ModalFallback />}>
      <LoadableEditPhotoManager processesIds={processesIds} />
    </Suspense>
  );
};

export default memo(EditPhotoManager);
