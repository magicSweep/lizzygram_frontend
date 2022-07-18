import Box from "@mui/system/Box";
import Button from "@mui/material/Button";
import Alerts from "./container/Alerts/Alerts";
import { useDispatch, useSelector } from "react-redux";
import { showAlertAC } from "./store";
import { GlobalState } from "./../types";

export default {
  component: Alerts,
  title: "AlertModule",
};

const AlertManager = () => {
  const dispatch = useDispatch();

  const { items } = useSelector((state: GlobalState) => state.alert);

  const showErrorAlert = () =>
    dispatch(showAlertAC({ message: "Это злой алерт...", alertType: "error" }));
  const showWarningAlert = () =>
    dispatch(
      showAlertAC({
        message: "Это подозрительный алерт...",
        alertType: "warning",
      })
    );
  const showSuccessAlert = () =>
    dispatch(
      showAlertAC({ message: "Это супер алерт...", alertType: "success" })
    );
  const showInfoAlert = () =>
    dispatch(
      showAlertAC({ message: "Это информационный алерт...", alertType: "info" })
    );

  return (
    <>
      <Alerts items={items} />
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
