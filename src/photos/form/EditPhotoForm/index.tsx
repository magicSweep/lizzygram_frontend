import React, { FC } from "react";
import FormWrapper from "../../../container/FormWrapper";
import UploadButton from "../../component/formElements/UploadButton";
import DatePicker from "../../component/formElements/DatePicker";
import Description from "../../component/formElements/Description";
import LinearProgress from "@mui/material/LinearProgress";
import { useForm } from "react-hook-form";
import TagCheckboxes from "../../../tags/container/TagCheckboxes";
import { TagsFormState } from "../../../tags/types";
import { EditPhotoFormData } from "../../types";
import { Photo, FirestoreDate } from "lizzygram-common-data/dist/types";
import {
  dateValidateOnEdit,
  descValidate,
  photoFileValidateOnEdit,
} from "../../rules";

export interface AddPhotoFormProps {
  //title: string;
  onSubmit: (...args: any) => void;
  onClose: () => void;
  uploadLoading?: boolean;
  photoData: Photo<FirestoreDate>;
  //photoSrc?: string;
  //defaultTagsIds?: string[];
  //uploadPhotoFormData: IUseUploadPhotoFormReturn;
}

const EditPhotoForm: FC<AddPhotoFormProps> = ({
  //title,
  onSubmit,
  onClose,
  uploadLoading,
  photoData,
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
  } = useForm<EditPhotoFormData>({
    defaultValues: {
      date: photoData.date.toDate(),
      desc: photoData.description,
    } as any,
  });

  /* const submitHandler = (event: any) => {
    event.preventDefault();
    event.stopPropagation();
    handleSubmit(onSubmit);
  }; */

  return (
    <FormWrapper
      title={"Изменить фото"}
      onSubmit={handleSubmit(onSubmit)}
      onClose={onClose}
      submitBtnTitle={"Отправить"}
      disabled={false}
    >
      <div className="flex justify-center mb-8">
        <img className="h-14 w-auto rounded" src={photoData.iconSrc} />
      </div>

      <div className="w-full mb-5">
        <UploadButton
          watch={watch as any}
          setValue={setValue as any}
          clearErrors={clearErrors}
          formState={formState}
          register={register as any}
          disabled={uploadLoading}
          validate={photoFileValidateOnEdit}
        />
      </div>

      <div className="w-full mb-6">
        <DatePicker
          clearErrors={clearErrors}
          setValue={setValue as any}
          register={register as any}
          watch={watch as any}
          formState={formState}
          disabled={uploadLoading}
          validate={dateValidateOnEdit}
        />
      </div>

      <div className="w-full mt-14 mb-5">
        <TagCheckboxes
          label="Опишите фото с помощью тэгов:"
          getValues={getValues as any}
          setValue={setValue as any}
          register={register as any}
          watch={watch as any}
          clearErrors={clearErrors}
          formState={formState}
          disabled={uploadLoading}
          defaultTags={photoData.tags}
          validate={undefined}
        />
      </div>

      <div className="w-full mb-5">
        <Description
          formState={formState}
          register={register as any}
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

export default EditPhotoForm;
