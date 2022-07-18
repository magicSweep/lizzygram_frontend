import { useCallback, useEffect } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
//import TagsReqManager from "../../requests/Tags/TagsReqManager";
import { TagData, TagsState } from "../../types";
import { then, _catch, compose } from "fmagic";
import { getAll } from "../../service/tagsDb/tagsDb.fake";
import { GlobalState } from "./../../../types";
import {
  tagsRequestStartAC,
  tagsRequestSuccessAC,
  tagsRequestErrorAC,
} from "./../../store";

let isInitReq = true;

export const makeReq = (dispatch: any, request: () => Promise<TagData[]>) =>
  compose(
    () => dispatch(tagsRequestStartAC()),
    request,
    then((tagsData: TagData[]) => dispatch(tagsRequestSuccessAC(tagsData))),
    _catch((err: any) => dispatch(tagsRequestErrorAC()))
  );

const useTags = () => {
  const dispatch = useDispatch();

  const { loading, error, tags } = useSelector<
    GlobalState,
    {
      loading: boolean;
      error: boolean;
      tags: TagData[] | undefined;
    }
  >(
    (state) => ({
      loading: state.tags.loading,
      error: state.tags.error,
      tags: state.tags.items,
    }),
    shallowEqual
  );

  //const { start, cancel } = useTagsReq();

  const send = useCallback(makeReq(dispatch, getAll), []);

  useEffect(() => {
    if (tags === undefined && isInitReq) {
      isInitReq = false;

      send();
    }
  }, []);

  return {
    loading,
    error,
    tags,
    reLoad: send,
    //cancel: reqManager.cancel,
  };
};

export default useTags;
