import React, { Fragment, useEffect, useCallback } from "react";
import { useDispatch } from "react-redux";
import { hideAlertAC, deleteAlertAC } from "../../store";
import Alert from "./Alert";
import { AlertProps } from "../../types";

const timeouts: any[] = [];

const Alerts = ({ items }: { items: AlertProps[] }) => {
  //const { items } = useSelector((state: GlobalState) => state.alert);

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
