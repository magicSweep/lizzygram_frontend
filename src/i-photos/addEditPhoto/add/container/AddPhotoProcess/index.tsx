import React, { FC } from "react";
import AddPhotoForm from "../AddPhotoForm";
import FormModal from "./../../../../../component/FormModal";
import useAddPhotoProcess from "./hook/useAddPhotoProcess";

export interface AddPhotoReqProps {
  userUid: string;
  id: string;
  /* removeRequest: (id: string) => void; */
}

const AddPhotoProcess: FC<AddPhotoReqProps> = ({ userUid, id }) => {
  const { addPhoto, onFormClose, showForm, uploadLoading } = useAddPhotoProcess(
    userUid,
    id
    /* removeRequest */
  );

  return (
    <>
      <FormModal open={showForm} onClose={onFormClose}>
        <AddPhotoForm
          uploadLoading={uploadLoading}
          onClose={onFormClose}
          onSubmit={addPhoto}
        />
      </FormModal>
    </>
  );
};

export default AddPhotoProcess;
