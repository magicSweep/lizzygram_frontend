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
//import { selfKillingChecker_, selfKilling__ } from "./helper";

export type SelfDestroyData = {
  isSelfKilled: boolean;
  isNeedSelfKilling: boolean;
  timerId: NodeJS.Timeout;
};

export const useSelfDestroy_ =
  (
    //useDispatch: typeof useDispatch_,
    useRef: typeof useRef_,
    useEffect: typeof useEffect_
  ) =>
  (selfDestroy: () => void, doesNeedSelfDestroy: () => boolean) => {
    //const dispatch = useDispatch();

    const mainRef = useRef<SelfDestroyData>({
      isSelfKilled: false,
      isNeedSelfKilling: false,
      timerId: null,
    });

    /* console.log(
      "---------useSelfDestroy_",
      mainRef.current.isSelfKilled,
      doesNeedSelfDestroy()
    ); */

    useEffect(() => {
      if (
        mainRef.current.isSelfKilled === false &&
        doesNeedSelfDestroy() === true
      ) {
        mainRef.current.isSelfKilled = true;

        mainRef.current.timerId = setTimeout(() => {
          selfDestroy();
        }, 1000);
      }

      return () => {
        if (mainRef.current.timerId) clearTimeout(mainRef.current.timerId);
      };
    });
  };

export default useSelfDestroy_(useRef_, useEffect_);
