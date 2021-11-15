import React from "react";
import FormWrapper from "../FormWrapper";

const AddPhotoForm = () => {
  return (
    <FormWrapper
      title={"Добавить фото"}
      onSubmit={() => console.log("onSubmit")}
      onClose={() => console.log("onClose")}
      submitBtnTitle={"Отправить"}
      disabled={false}
    >
      <p>Hello</p>
    </FormWrapper>
  );
};

export default AddPhotoForm;
