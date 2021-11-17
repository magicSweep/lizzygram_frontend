import { FC } from "react";
import AddPhotoForm from "../../../form/AddPhotoForm";
import FormModal from "./../../../../component/FormModal";
import { useAddPhotoReq } from "./hook";

export interface AddPhotoReqProps {
  id: string;
  /* removeRequest: (id: string) => void; */
}

const AddPhotoReq: FC<AddPhotoReqProps> = ({ id }) => {
  const { addPhoto, onFormClose, showForm, uploadLoading } = useAddPhotoReq(
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

export default AddPhotoReq;
