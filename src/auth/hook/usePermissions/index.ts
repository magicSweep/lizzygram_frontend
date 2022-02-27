import {
  grantPermissionsRequestStartAC,
  revokePermissionsRequestStartAC,
  permissionsRequestEndAC,
} from "./../../store/action";
import { compose, tap, then, _catch } from "fmagic";
import {
  grantPermissions as sendGrantPermissionsReq_,
  revokePermissions as sendRevokePermissionsReq_,
} from "../../repository/firestore";
import { batch as batch_, useDispatch } from "react-redux";
import { showAlertAC } from "./../../../alert";
//import { useAuth } from "./../useAuth";
import { useEditor } from "./../useEditor";

type PermissionsReqData = {
  userUid: string;
  dispatch: any;
  onChangeEditorStatus: (isEditor: boolean) => void;
};

export const grantPermissionsReq_ =
  (
    batch: typeof batch_,
    sendGrantPermissionsReq: typeof sendGrantPermissionsReq_
  ) =>
  (data: PermissionsReqData) =>
    compose<PermissionsReqData, Promise<void>>(
      tap(({ dispatch }: PermissionsReqData) =>
        dispatch(grantPermissionsRequestStartAC())
      ),
      async (data: PermissionsReqData) => {
        await sendGrantPermissionsReq(data.userUid);
        return data;
      },
      then(({ dispatch, onChangeEditorStatus }: PermissionsReqData) => {
        onChangeEditorStatus(true);
        batch(() => {
          //dispatch(permissionsRequestEndAC());
          dispatch(
            showAlertAC(
              "Поздравляем, вы получили права для добавления фоток на сайте.",
              "success"
            )
          );
        });
      }),
      _catch((err: any) => {
        batch(() => {
          data.dispatch(permissionsRequestEndAC());
          data.dispatch(
            showAlertAC(
              "К сожалению произошла ошибочка. Попробуйте позже...",
              "error"
            )
          );
        });
      })
    )(data);

export const revokePermissionsReq_ =
  (
    batch: typeof batch_,
    sendRevokePermissionsReq: typeof sendRevokePermissionsReq_
  ) =>
  (data: PermissionsReqData) =>
    compose<PermissionsReqData, Promise<void>>(
      tap(({ dispatch }: PermissionsReqData) =>
        dispatch(revokePermissionsRequestStartAC())
      ),
      async (data: PermissionsReqData) => {
        await sendRevokePermissionsReq(data.userUid);
        return data;
      },
      then(({ dispatch, onChangeEditorStatus }: PermissionsReqData) => {
        onChangeEditorStatus(false);
        batch(() => {
          //dispatch(permissionsRequestEndAC());
          dispatch(
            showAlertAC(
              "Поздравляем, вы потеряли право на добавления фоток на сайте.",
              "success"
            )
          );
        });
      }),
      _catch((err: any) => {
        batch(() => {
          data.dispatch(permissionsRequestEndAC());
          data.dispatch(
            showAlertAC(
              "К сожалению произошла ошибочка. Попробуйте позже...",
              "error"
            )
          );
        });
      })
    )(data);

export const grantPermissionsReq = grantPermissionsReq_(
  batch_,
  sendGrantPermissionsReq_
);

export const revokePermissionsReq = revokePermissionsReq_(
  batch_,
  sendRevokePermissionsReq_
);

//export const revokePermissionsReq = compose<>();

export const usePermissions_ =
  (
    grantPermissionsReq_: typeof grantPermissionsReq,
    revokePermissionsReq_: typeof revokePermissionsReq
  ) =>
  () => {
    const {
      user: { uid: userUid },
      onChangeEditorStatus,
    } = useEditor();
    const dispatch = useDispatch();

    const grantPermissions = () =>
      grantPermissionsReq_({
        userUid,
        dispatch,
        onChangeEditorStatus,
      });

    const revokePermissions = () =>
      revokePermissionsReq_({
        userUid,
        dispatch,
        onChangeEditorStatus,
      });

    return {
      grantPermissions,
      revokePermissions,
    };
  };

export const usePermissions = usePermissions_(
  grantPermissionsReq,
  revokePermissionsReq
);
