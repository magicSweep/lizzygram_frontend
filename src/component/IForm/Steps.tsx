import * as React from "react";
import Box from "@mui/material/Box";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import StepContent from "@mui/material/StepContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import UploadButtonWidget from "../../component/formElements/UploadButton";
import {
  useUploadBtnForm,
  UploadBtnFormProps,
} from "../../photos/addEditPhoto/common/component/formElements/UploadButton/hook";
import {
  useDescriptionForm,
  DescriptionFormProps,
} from "../../photos/addEditPhoto/common/component/formElements/Description/hook";
import DescriptionWidget from "./../../component/formElements/Description";

export const UploadStep = ({
  handleNext,
  handleBack,
  isLast,
  trigger,
  ...props
}: UploadBtnFormProps & any) => {
  const { ref, fields, files, isError, helperText, fieldName } =
    useUploadBtnForm(props);

  const handleNext_ = async () => {
    const result = await trigger(fieldName);

    if (result === false) {
      return;
    }

    handleNext();
  };

  return (
    <Step>
      <StepLabel>Add photo file</StepLabel>
      <StepContent>
        <Typography>
          Photo that you add must follow some requirements:
        </Typography>
        <Typography component="ul">
          <li>- format must be one of jpeg, webp, png</li>
          <li>- size must be under 20 Mb</li>
        </Typography>

        <Box sx={{ mb: 2 }}>
          <UploadButtonWidget
            inputRef={ref}
            error={isError}
            fileList={files}
            /*  value={value}
      onChange={onChange} */
            helperText={helperText as any}
            disabled={false}
            {...fields}
          />
        </Box>

        <Box sx={{ mb: 2 }}>
          <div>
            <Button
              variant="contained"
              onClick={handleNext_}
              sx={{ mt: 1, mr: 1 }}
            >
              {isLast === true ? "Submit" : "Continue"}
            </Button>
            {handleBack !== undefined && (
              <Button onClick={handleBack} sx={{ mt: 1, mr: 1 }}>
                Back
              </Button>
            )}
          </div>
        </Box>
      </StepContent>
    </Step>
  );
};

export const DescriptionStep = ({
  handleNext,
  handleBack,
  isLast,
  trigger,
  ...props
}: DescriptionFormProps & any) => {
  const { ref, onChange, isError, helperText, onBlur, fieldName } =
    useDescriptionForm(props);

  const handleNext_ = async () => {
    const result = await trigger(fieldName);

    if (result === false) {
      return;
    }

    handleNext();
  };

  return (
    <Step>
      <StepLabel>Add description</StepLabel>
      <StepContent>
        <Typography>
          This field is not required. Yout can add, for example, name of place
          or people's names
        </Typography>

        <Box sx={{ mb: 2 }}>
          <DescriptionWidget
            error={isError}
            helperText={helperText as any}
            disabled={false}
            inputRef={ref}
            onChange={onChange}
            onBlur={onBlur}
          />
        </Box>

        <Box sx={{ mb: 2 }}>
          <div>
            <Button
              variant="contained"
              onClick={handleNext_}
              sx={{ mt: 1, mr: 1 }}
            >
              {isLast === true ? "Submit" : "Continue"}
            </Button>
            {handleBack !== undefined && (
              <Button onClick={handleBack} sx={{ mt: 1, mr: 1 }}>
                Back
              </Button>
            )}
          </div>
        </Box>
      </StepContent>
    </Step>
  );
};
