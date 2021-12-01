import React, { FC, Fragment } from "react";
//import { useSelector } from "react-redux";
//import { GlobalState } from "../../../types";
import AddPhotoReq from "./AddPhotoReq";

export type AddPhotoReqsProps = {
  requests: string[];
};

const AddPhotoReqs: FC<AddPhotoReqsProps> = ({ requests }) => {
  /* const requests = useSelector<GlobalState, string[]>(
    (state) => state.photos.addReqs.reqIds
  ); */

  const elements = requests.map((reqId, i) => (
    <Fragment key={reqId}>
      <AddPhotoReq id={reqId} />
    </Fragment>
  ));

  //console.log("RENDER AddPhotoReqs", requests);

  return <>{elements}</>;
};

export default AddPhotoReqs;
