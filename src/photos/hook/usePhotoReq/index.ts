import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";

/* type ReqStage =
  | "form"
  | "request"
  | "get_new_photo"
  | "finish_with_error"
  | "finish_with_success"; */

export const usePhotoReq = (
  id: string,
  removeRequest: (dispatch: any) => void
) => {
  const mainRef = useRef<any>({
    isSubmited: false,
    formData: {},
    selfKilling: false,
    timerId: null,
  });

  const [state, setState] = useState({
    showForm: false,
    formWasClosed: false,
    uploadLoading: false,
    end: false,
    //successReq: false,
    //errorReq: "",
  });

  const dispatch = useDispatch();

  // TODO:
  /* const userUid = useSelector((state: any) =>
          state.auth.user ? state.auth.user.uid : ""
        ); */
  const userUid = "userUid";

  /*   const searchState = useSelector<GlobalState, ISearchState>(
      (state) => state.search
    ); */

  const onSelfKilling = () => {
    console.log("onSelfKilling", mainRef);
    mainRef.current.selfKilling = true;

    mainRef.current.timerId = setTimeout(() => {
      removeRequest(dispatch);
    }, 1000);
  };

  useEffect(() => {
    setState({
      ...state,
      showForm: true,
    });
  }, []);

  // remove self
  useEffect(() => {
    // remove request if:
    // - it successfully done
    // - it has error and form already closed
    // - form closed without submit
    // - form closed and we get error

    if (mainRef.current.selfKilling === true) return;

    //if (state.successReq === true) onSelfKilling();

    if (state.showForm === false && state.formWasClosed === true) {
      if (mainRef.current.isSubmited === false) {
        onSelfKilling();
      }

      if (state.end === true) {
        onSelfKilling();
      }

      /* if (state.errorReq || state.successReq) {
        onSelfKilling();
      } */

      /* if (state.errorReq || mainRef.current.isSubmited) {
          onSelfKilling();
        } */
    }

    return () => {
      if (mainRef.current.timerId) clearTimeout(mainRef.current.timerId);
    };
  });

  const onFormClose = () => {
    ///console.log("ON FORM CLOSE");
    setState((prevState) => ({
      ...prevState,
      showForm: false,
      formWasClosed: true,
    }));
  };

  return {
    onFormClose,
    state,
    setState,
    userUid,
    dispatch,
    mainRef,
  };
};
