import React, { FC } from "react";
import FormWrapper from "../../../container/FormWrapper";
import { useForm } from "react-hook-form";
import TagCheckboxes from "../../../tags/container/TagCheckboxes";
//import { TagsFormState } from "../../../tags/types";
import AgeSelect from "../../container/formElements/AgeSelect";
import { SearchTerms, SearchPhotoFormData } from "../../types";

export interface SearchPhotoFormProps {
  onSubmit: (...args: any) => void;
  onClose: () => void;
  searchTerms: SearchTerms;
  isNeedAge: boolean;
}

const SearchPhotoForm: FC<SearchPhotoFormProps> = ({
  searchTerms,
  onSubmit,
  onClose,
  isNeedAge,
}) => {
  const {
    handleSubmit,
    formState,
    register,
    setValue,
    clearErrors,
    watch,
    getValues,
  } = useForm<SearchPhotoFormData>({
    defaultValues: {
      age: searchTerms.age,
    } as any,
  });

  return (
    <FormWrapper
      title={"Искать фото"}
      onSubmit={handleSubmit(onSubmit)}
      onClose={onClose}
      submitBtnTitle={"Искать"}
      disabled={false}
    >
      {isNeedAge === true && (
        <div className="w-full mb-5">
          <AgeSelect
            clearErrors={clearErrors}
            setValue={setValue as any}
            register={register as any}
            watch={watch as any}
            formState={formState}
            disabled={false}
          />
        </div>
      )}

      <div className="w-full mt-14 mb-5">
        <TagCheckboxes
          label="Выберите тэги:"
          getValues={getValues as any}
          setValue={setValue as any}
          register={register as any}
          watch={watch as any}
          clearErrors={clearErrors}
          formState={formState}
          disabled={false}
          defaultTags={
            searchTerms.tags !== undefined ? searchTerms.tags : undefined
          }
          validate={undefined}
        />
      </div>
    </FormWrapper>
  );
};

export default SearchPhotoForm;
