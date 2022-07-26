import React, { FC } from "react";
import FormWrapper from "../../../../../container/FormWrapper";
import UploadButton from "../../../common/component/formElements/UploadButton";
import DatePicker from "../../../common/component/formElements/DatePicker";
import Description from "../../../common/component/formElements/Description";
import LinearProgress from "@mui/material/LinearProgress";
import { useForm } from "react-hook-form";
import TagCheckboxes from "../../../../../tags/container/TagCheckboxes";
//import { TagsFormState } from "../../../../../tags/types";
import {
  dateValidateOnAdd,
  descValidate,
  photoFileValidateOnAdd,
} from "../../../common/rules";
import { tagsValidate } from "../../../../../tags/rules";
import { AddPhotoFormData } from "../../../types";

export const FormElement: FC = ({ children }) => {
  /* .element {
  width: 100%;
  margin-bottom: 20px;

  /*  &:first-child {
    margin-bottom: 0;
    text-align: center;
  } 

  &:nth-child(2) {
    margin-bottom: 0;
    text-align: center;
  }
} */
  return <div className="w-full mb-5">{children}</div>;
};

export interface AddPhotoFormProps {
  //title: string;
  onSubmit: (...args: any) => void;
  onClose: () => void;
  uploadLoading?: boolean;
  //photoSrc?: string;
  //defaultTagsIds?: string[];
  //uploadPhotoFormData: IUseUploadPhotoFormReturn;
}
/* 
type AddPhotoFormData = {
  desc?: string;
  date: Date;
  photoFile: FileList;
  tags: TagsFormState;
}; */

const AddPhotoForm: FC<AddPhotoFormProps> = ({
  //title,
  onSubmit,
  onClose,
  uploadLoading,
  //uploadPhotoFormData,
  //photoSrc,
}) => {
  const {
    handleSubmit,
    formState,
    register,
    setValue,
    clearErrors,
    watch,
    getValues,
  } = useForm<AddPhotoFormData>();

  /* const submitHandler = (event: any) => {
    event.preventDefault();
    event.stopPropagation();
    handleSubmit(onSubmit);
  }; */

  return (
    <FormWrapper
      title={"Добавить фото"}
      onSubmit={handleSubmit(onSubmit)}
      onClose={onClose}
      submitBtnTitle={"Отправить"}
      disabled={false}
    >
      <div className="w-full mb-5">
        <UploadButton
          watch={watch}
          setValue={setValue}
          clearErrors={clearErrors}
          formState={formState}
          register={register}
          disabled={uploadLoading}
          validate={photoFileValidateOnAdd}
        />
      </div>

      <div className="w-full mb-6">
        <DatePicker
          clearErrors={clearErrors}
          setValue={setValue}
          register={register}
          watch={watch}
          formState={formState}
          disabled={uploadLoading}
          validate={dateValidateOnAdd}
        />
      </div>

      <div className="w-full mt-14 mb-5">
        <TagCheckboxes
          label="Опишите фото с помощью тэгов:"
          getValues={getValues}
          setValue={setValue}
          register={register}
          watch={watch}
          clearErrors={clearErrors}
          formState={formState}
          disabled={uploadLoading}
          defaultTags={undefined}
          validate={tagsValidate}
        />
      </div>

      <div className="w-full mb-5">
        <Description
          formState={formState}
          register={register}
          disabled={uploadLoading}
          validate={descValidate}
        />
      </div>

      {uploadLoading === true && (
        <div className="mb-3">
          <LinearProgress color="secondary" />
        </div>
      )}
    </FormWrapper>
  );
};

export default AddPhotoForm;
