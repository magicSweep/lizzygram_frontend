import Box from "@mui/system/Box";
import Button from "@mui/material/Button";
import Alert from ".";
import { useState } from "react";

export default {
  component: Alert,
  title: "Alert/Alert",
};

const AlertManager = () => {
  const [state, setState] = useState<any>({
    open: false,
    type: "",
    message: "",
  });

  const showErrorAlert = () =>
    setState({ message: "Это злой алерт...", type: "error", open: true });
  const showWarningAlert = () =>
    setState({
      message: "Это подозрительный алерт...",
      type: "warning",
      open: true,
    });
  const showSuccessAlert = () =>
    setState({ message: "Это супер алерт...", type: "success", open: true });
  const showInfoAlert = () =>
    setState({
      message: "Это информационный алерт...",
      type: "info",
      open: true,
    });

  const onClose = () => setState((state) => ({ ...state, open: false }));

  return (
    <>
      <Alert {...state} onClose={onClose} />
      <Box>
        <Button color="error" onClick={showErrorAlert}>
          Error
        </Button>
        <Button color="warning" onClick={showWarningAlert}>
          Warning
        </Button>
        <Button color="success" onClick={showSuccessAlert}>
          Success
        </Button>
        <Button color="info" onClick={showInfoAlert}>
          Info
        </Button>
      </Box>
    </>
  );
};

export const Default = () => <AlertManager />;
