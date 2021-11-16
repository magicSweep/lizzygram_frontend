import Box from "@mui/system/Box";
import Button from "@mui/material/Button";
import Alerts from ".";
import { useDispatch } from "react-redux";
import { showAlertAC } from "../../store/action";

export default {
  component: Alerts,
  title: "Alert/Alerts",
};

const AlertManager = () => {
  const dispatch = useDispatch();

  const showErrorAlert = () =>
    dispatch(showAlertAC("Это злой алерт...", "error"));
  const showWarningAlert = () =>
    dispatch(showAlertAC("Это подозрительный алерт...", "warning"));
  const showSuccessAlert = () =>
    dispatch(showAlertAC("Это супер алерт...", "success"));
  const showInfoAlert = () =>
    dispatch(showAlertAC("Это информационный алерт...", "info"));

  return (
    <>
      <Alerts />
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
