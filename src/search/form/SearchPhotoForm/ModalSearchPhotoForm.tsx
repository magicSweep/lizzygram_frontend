import React from "react";
//import classes from './SearchPhotoForm.module.scss';
//import { makeStyles } from "@material-ui/core/styles";
import { useSearchPhotoForm } from "./hook";
//import { fromFormDataToState } from "./helper";
import SearchPhotoForm from "./SearchPhotoForm";
import FormModal from "./../../../component/FormModal";

export const ModalSearchPhotoForm = ({ isShow }: { isShow: boolean }) => {
  //close form on set state
  const { searchTerms, onClose, onSubmit } = useSearchPhotoForm();

  return (
    <FormModal open={isShow} onClose={onClose}>
      <SearchPhotoForm
        searchTerms={searchTerms}
        onClose={onClose}
        onSubmit={onSubmit}
      />
    </FormModal>
  );
};

export default ModalSearchPhotoForm;
