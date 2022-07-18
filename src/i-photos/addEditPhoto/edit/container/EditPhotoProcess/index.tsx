import { FirestoreDate, Photo } from "lizzygram-common-data/dist/types";
import React, { FC } from "react";
import { useSelector } from "react-redux";
import { GlobalState } from "../../../../../types";
import EditPhotoForm from "../EditPhotoForm";
import FormModal from "./../../../../../component/FormModal";
import useEditPhotoProcess from "./hook/useEditPhotoProcess";

export interface EditPhotoReqProps {
  userUid: string;
  id: string;
  /* removeRequest: (id: string) => void; */
}

const EditPhotoProcess: FC<EditPhotoReqProps> = ({ userUid, id }) => {
  const photo = useSelector<GlobalState, Photo<FirestoreDate>>((state) =>
    //@ts-ignore
    state.loadPhotos.photos.find((photo) => id === photo.id)
  );

  const { editPhoto, onFormClose, showForm, uploadLoading } =
    useEditPhotoProcess(id, photo);

  return (
    <>
      <FormModal open={showForm} onClose={onFormClose}>
        <EditPhotoForm
          uploadLoading={uploadLoading}
          onClose={onFormClose}
          onSubmit={editPhoto}
          photoData={photo}
        />
      </FormModal>
    </>
  );
};

export default EditPhotoProcess;
