import React, { FC, Fragment } from "react";
//import { useSelector } from "react-redux";
//import { GlobalState } from "../../../types";
import AddPhotoProcess from "./AddPhotoProcess";

export type AddPhotoManagerProps = {
  processesIds: string[];
};

const AddPhotoManager: FC<AddPhotoManagerProps> = ({ processesIds }) => {
  /* const requests = useSelector<GlobalState, string[]>(
    (state) => state.photos.addReqs.reqIds
  ); */

  const elements = processesIds.map((reqId, i) => (
    <Fragment key={reqId}>
      <AddPhotoProcess id={reqId} />
    </Fragment>
  ));

  //console.log("RENDER AddPhotoManager", requests);

  return <>{elements}</>;
};

export default AddPhotoManager;
