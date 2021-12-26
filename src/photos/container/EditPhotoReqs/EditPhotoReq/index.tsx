import React, { FC, MutableRefObject, useRef } from "react";
import EditPhotoForm from "../../../form/EditPhotoForm";
import { useEditPhotoReq } from "./hook";
import { Photo, FirestoreDate } from "./../../../types";
import { GlobalState } from "./../../../../types";
import FormModal from "./../../../../component/FormModal";
import { useSelector } from "react-redux";

export interface EditPhotoReqProps {
  id: string;
  //photo: IPhoto;
  /*  removeRequest: (id: string) => void; */
}

const EditPhotoReq: FC<EditPhotoReqProps> = ({ id }) => {
  const photo = useSelector<GlobalState, Photo<FirestoreDate>>((state) =>
    state.photos.photos.find((elem) => id === elem.id)
  );

  const photoRef: MutableRefObject<Photo<FirestoreDate>> | undefined =
    useRef(undefined);

  if (photoRef.current === undefined) {
    photoRef.current = photo;
  }

  const { editPhoto, onFormClose, showForm, uploadLoading } = useEditPhotoReq(
    id,
    photoRef.current
  );

  //console.log("=========PHOTO DATA", photo, id);

  return (
    <>
      <FormModal open={showForm} onClose={onFormClose}>
        <EditPhotoForm
          uploadLoading={uploadLoading}
          onClose={onFormClose}
          onSubmit={editPhoto}
          photoData={photoRef.current}
        />
      </FormModal>
    </>
  );
};

export default EditPhotoReq;
