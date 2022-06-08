import { compose, set, tap } from "fmagic";
/* import {
  FirestoreDate,
  Photo,
  WorkerRequest,
  WorkerResponse,
} from "lizzygram-common-data/dist/types"; */
import {
  MutableRefObject,
  useEffect as useEffect_,
  useRef as useRef_,
  //useState,
} from "react";
import { useDispatch as useDispatch_ } from "react-redux";
//import { useAuth } from "../../../auth";
//import { SearchTerms } from "../../../search/types";
//import { EditPhotoFormData } from "../../types";
import { selfKillingChecker_, selfKilling__ } from "./helper";
import { PhotoProcessState } from ".";

export type UseSelfKillRefData = {
  isSelfKilled: boolean;
  isNeedSelfKilling: boolean;
  timerId: null | NodeJS.Timeout;
};

type UseSelfKillProps = {
  state: Omit<PhotoProcessState, "uploadLoading">;
  removeRequest: () => void;
};

type UseSelfKillData = UseSelfKillProps & {
  dispatch: any;
  mainRef: MutableRefObject<UseSelfKillRefData>;
  selfKilling: () => void;
};

export const useSelfKill_ = (
  useDispatch: typeof useDispatch_,
  useRef: typeof useRef_,
  useEffect: typeof useEffect_,
  selfKilling_: typeof selfKilling__,
  selfKillingChecker: typeof selfKillingChecker_
) =>
  compose<UseSelfKillProps, void>(
    // SET DISPATCH
    (props: UseSelfKillProps) => ({
      ...props,
      dispatch: useDispatch(),
    }),
    // INIT MAIN REF
    (data: UseSelfKillData) => ({
      ...data,
      mainRef: useRef<UseSelfKillRefData>({
        isSelfKilled: false,
        isNeedSelfKilling: false,
        timerId: null,
      }),
    }),
    // SET SELF_KILLING METHOD
    set(
      "selfKilling",
      ({ mainRef, removeRequest, dispatch }: UseSelfKillData) =>
        selfKilling_(mainRef, removeRequest, dispatch)
    ),
    // ON USE_EFFECT CHECK IF NEED TO SELF REMOVE
    tap((data: UseSelfKillData) =>
      useEffect(() => {
        if (
          selfKillingChecker({
            isSelfKilled: data.mainRef.current.isSelfKilled,
            state: data.state,
            //selfKilling: data.selfKilling
          }) === true
        )
          data.selfKilling();

        return () => {
          if (data.mainRef.current.timerId)
            clearTimeout(data.mainRef.current.timerId);
        };
      })
    )
  );

export const useSelfKill = useSelfKill_(
  useDispatch_,
  useRef_,
  useEffect_,
  selfKilling__,
  selfKillingChecker_
);
