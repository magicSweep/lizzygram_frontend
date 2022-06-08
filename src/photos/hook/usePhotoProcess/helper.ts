import { MutableRefObject } from "react";
import { UseSelfKillRefData } from "./hook";
import { PhotoProcessState } from ".";

export const selfKilling__ =
  (
    mainRef: MutableRefObject<UseSelfKillRefData>,
    removeRequest: (dispatch: any) => void,
    dispatch: any
  ) =>
  () => {
    //console.log("onSelfKilling", mainRef);
    mainRef.current.isSelfKilled = true;

    mainRef.current.timerId = setTimeout(() => {
      removeRequest(dispatch);
    }, 1000);
  };

export type SelfKillingCheckerProps = {
  isSelfKilled: boolean;
  state: Omit<PhotoProcessState, "uploadLoading">;
  //selfKilling: () => void,
};

export const selfKillingChecker_ = ({
  isSelfKilled,
  state,
}: SelfKillingCheckerProps) => {
  // remove request if:
  // - it successfully done
  // - it has error and form already closed
  // - form closed without submit
  // - form closed and we get error

  if (isSelfKilled === true) return false;

  //if (state.successReq === true) onSelfKilling();

  if (state.showForm === false && state.formWasClosed === true) {
    if (state.isFormSubmited === false || state.isEndReq === true) {
      //selfKilling();
      return true;
    }

    // end
    /* if (isEndReq === true) {
      onSelfKilling();
    } */
  }

  return false;
};
