import { Box } from "@mui/system";
import FormWrapper from ".";

export default {
  component: FormWrapper,
  title: "Photos/Forms/FormWrapper",
};

export const Default = () => {
  return (
    <FormWrapper
      title={"Добавить два супер пупер фото"}
      onSubmit={() => console.log("onSubmit")}
      onClose={() => console.log("onClose")}
      submitBtnTitle={"Отправить"}
      disabled={false}
    >
      <Box width="80%" height="500px" m="auto"></Box>
    </FormWrapper>
  );
};
