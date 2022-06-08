import React, { FC } from "react";
import AddPhotoForm from "../../../form/AddPhotoForm";
import FormModal from "./../../../../component/FormModal";
import { useAddPhotoProcess } from "./hook";

export interface AddPhotoReqProps {
  id: string;
  /* removeRequest: (id: string) => void; */
}

const AddPhotoProcess: FC<AddPhotoReqProps> = ({ id }) => {
  const { addPhoto, onFormClose, showForm, uploadLoading } = useAddPhotoProcess(
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
