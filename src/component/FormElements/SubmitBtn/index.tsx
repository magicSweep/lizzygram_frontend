import * as React from "react";
import LoadingButton from "@mui/lab/LoadingButton";
import SendIcon from "@mui/icons-material/Send";

export type SubmitBtnProps = {
  submit: (event?: any) => void;
  loading: boolean;
  children: any;
};

const SubmitBtn: React.FC<SubmitBtnProps> = ({ submit, loading, children }) => {
  return (
    <LoadingButton
      onClick={submit}
      endIcon={<SendIcon />}
      loading={loading}
      loadingPosition="end"
      variant="contained"
    >
      {children}
    </LoadingButton>
  );
};

export default SubmitBtn;
