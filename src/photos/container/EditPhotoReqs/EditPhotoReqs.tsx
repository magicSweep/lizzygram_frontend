import { FC, Fragment } from "react";
import { useSelector } from "react-redux";
import { GlobalState } from "../../../types";
import EditPhotoReq from "./EditPhotoReq";

export type EditPhotoReqsProps = {
  requests: string[];
};

const EditPhotoReqs: FC<EditPhotoReqsProps> = ({ requests }) => {
  /* const requests = useSelector<GlobalState, string[]>(
    (state) => state.photos.editReqs.reqIds
  ); */

  const elements = requests.map((reqId, i) => (
    <Fragment key={reqId}>
      <EditPhotoReq id={reqId} />
    </Fragment>
  ));

  console.log("RENDER EditPhotoReqs", requests);

  return (
    <>
      {/*  <Button variant="contained" onClick={() => addNewRequest("332399")}>
        Start new request.
      </Button> */}

      {elements}
    </>
  );
};

export default EditPhotoReqs;
