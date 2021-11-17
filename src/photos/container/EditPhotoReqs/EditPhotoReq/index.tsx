import { FC } from "react";
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
  const photo = useSelector<GlobalState, Photo<FirestoreDate>>(
    (state) =>
      (state.photos.photos as Photo<FirestoreDate>[]).find(
        (elem) => id === elem.id
      ) as Photo<FirestoreDate>
  );

  const { editPhoto, onFormClose, showForm, uploadLoading } = useEditPhotoReq(
    id,
    photo
  );

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

export default EditPhotoReq;
