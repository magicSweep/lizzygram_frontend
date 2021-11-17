import { lazy, Suspense } from "react";
import { useSelector } from "react-redux";
import ModalFallback from "../../../component/ModalFallback";
import { GlobalState } from "../../../types";

const LoadableAddPhotoReqs = lazy(() => import("./AddPhotoReqs"));

let isInit = false;

const AddPhotoReqs = () => {
  const requests = useSelector<GlobalState, string[]>(
    (state) => state.photos.addReqs.reqIds
  );

  if (isInit === false) {
    if (requests.length === 0) return null;
    else isInit = true;
  }

  return (
    <Suspense fallback={<ModalFallback />}>
      <LoadableAddPhotoReqs requests={requests} />
    </Suspense>
  );
};

export default AddPhotoReqs;
