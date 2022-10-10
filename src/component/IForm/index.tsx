import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import StepContent from "@mui/material/StepContent";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import UploadButtonWidget from "../../component/formElements/UploadButton";
import {
  useUploadBtnForm,
  UploadBtnFormProps,
} from "../../photos/addEditPhoto/common/component/formElements/UploadButton/hook";
import { useForm } from "react-hook-form";
import {
  descValidate,
  photoFileValidateOnAdd,
} from "../../photos/addEditPhoto/common/rules";
import UploadButton, {
  fieldName as btnFieldName,
} from "../../photos/addEditPhoto/common/component/formElements/UploadButton";
import Description, {
  fieldName as descFieldName,
} from "../../photos/addEditPhoto/common/component/formElements/Description";

const StepperControls = ({ handleNext, handleBack, isLast }) => {
  return (
    <Box sx={{ mb: 2 }}>
      <div>
        <Button
          size="small"
          variant="contained"
          onClick={handleNext}
          sx={{ mt: 1, mr: 1 }}
        >
          {isLast === true ? "Отправить" : "Вперед"}
        </Button>
        {handleBack !== undefined && (
          <Button size="small" onClick={handleBack} sx={{ mt: 1, mr: 1 }}>
            Назад
          </Button>
        )}
      </div>
    </Box>
  );
};

export function VerticalLinearStepper() {
  const {
    handleSubmit,
    formState,
    register,
    setValue,
    clearErrors,
    watch,
    getValues,
    trigger,
  } = useForm<any>();

  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = async (fieldName: string) => {
    const result = await trigger(fieldName);

    if (result === false) {
      return;
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <Box component="form" action="#" sx={{ maxWidth: 400 }}>
      <Stepper activeStep={activeStep} orientation="vertical">
        <Step>
          <StepLabel>Добавить фото файл</StepLabel>
          <StepContent>
            <Typography sx={{ p: 1 }}>
              Фото должно соответствовать ниже перечисленным параметрам:
            </Typography>
            <Typography component="ul" sx={{ pl: 2 }}>
              <li> - формат должен быть jpeg, webp, png</li>
              <li> - размер файла не должен превышать 20 Mb</li>
            </Typography>

            <Box sx={{ p: 2, textAlign: "center" }}>
              <UploadButton
                watch={watch}
                setValue={setValue}
                clearErrors={clearErrors}
                formState={formState as any}
                register={register}
                disabled={false}
                validate={photoFileValidateOnAdd}
              />
            </Box>

            <StepperControls
              handleNext={() => handleNext(btnFieldName)}
              handleBack={undefined}
              isLast={false}
            />
          </StepContent>
        </Step>

        <Step>
          <StepLabel>Добавить описание</StepLabel>
          <StepContent>
            <Typography>
              Вы можете, например, указать имена людей на фото или место где
              происходит действие. В любом случае - это необязательно и вы
              можете просто перейти к следующему полю.
            </Typography>

            <Box sx={{ mb: 2 }}>
              <Description
                formState={formState as any}
                register={register}
                disabled={false}
                validate={descValidate}
              />
            </Box>
            <StepperControls
              handleNext={() => handleNext(descFieldName)}
              handleBack={handleBack}
              isLast={true}
            />
          </StepContent>
        </Step>
        {/* <UploadStep
          watch={watch}
          setValue={setValue}
          clearErrors={clearErrors}
          formState={formState as any}
          register={register}
          validate={photoFileValidateOnAdd}
          handleNext={handleNext}
          handleBack={undefined}
          isLast={false}
          trigger={trigger}
        />
        <DescriptionStep
          watch={watch}
          setValue={setValue}
          clearErrors={clearErrors}
          formState={formState as any}
          register={register}
          validate={photoFileValidateOnAdd}
          handleNext={handleNext}
          handleBack={undefined}
          isLast={false}
          trigger={trigger}
        /> */}
      </Stepper>
      {activeStep === 2 && (
        <Paper square elevation={0} sx={{ p: 3 }}>
          <Typography>All steps completed - you&apos;re finished</Typography>
          <Button onClick={handleReset} sx={{ mt: 1, mr: 1 }}>
            Reset
          </Button>
        </Paper>
      )}
    </Box>
  );
}

/* const IForm: FC = () => {

  

    return (
        <form>

        </form>
    );
}

export default IForm; */
