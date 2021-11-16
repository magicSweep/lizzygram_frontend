import { Fragment, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { hideAlertAC, deleteAlertAC } from "../../store/action";
import { GlobalState } from "../../../types";
import Alert from "./Alert";

const timeouts: any[] = [];

const Alerts = () => {
  const { items } = useSelector((state: GlobalState) => state.alert);

  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      for (let timeout of timeouts) {
        clearTimeout(timeout);
      }
    };
  }, []);

  const onClose = useCallback((id: number) => {
    dispatch(hideAlertAC(id));

    timeouts.push(setTimeout(() => dispatch(deleteAlertAC(id)), 2000));
  }, []);

  //console.log("[RENDER ALERTS]", items);

  const alertElements = items.map(({ id, ...props }) => (
    <Fragment key={`alert_${id}`}>
      <Alert
        onClose={() => {
          //console.log("On close", id);
          onClose(id);
        }}
        {...props}
      />
    </Fragment>
  ));

  return <>{alertElements}</>;
};

export default Alerts;
