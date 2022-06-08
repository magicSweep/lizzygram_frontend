import React, { FC, Fragment } from "react";
//import { useSelector } from "react-redux";
//import { GlobalState } from "../../../types";
import EditPhotoProcess from "./../EditPhotoProcess";
import { useAuth } from "../../../../../auth/hook/useAuth";

export type EditPhotoManagerProps = {
  processesIds: string[];
};

const EditPhotoManager: FC<EditPhotoManagerProps> = ({ processesIds }) => {
  /* const requests = useSelector<GlobalState, string[]>(
    (state) => state.photos.editReqs.reqIds
  ); */

  const { userUid } = useAuth();

  const elements = processesIds.map((reqId, i) => (
    <Fragment key={reqId}>
      <EditPhotoProcess userUid={userUid} id={reqId} />
    </Fragment>
  ));

  //console.log("RENDER EditPhotoManager", requests);

  return <>{elements}</>;
};

export default EditPhotoManager;
