import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { showSearchFormAC, resetSearchTermsAC } from "./../../store/action";
import { GlobalState } from "../../../types";

export const useSearchBtn = () => {
  const dispatch = useDispatch();

  const {
    //authUser,
    //authLoading,
    //isAuth,
    isSearch,
    isShowSearchPhotoForm,
  } = useSelector<
    GlobalState,
    {
      //isAuth: boolean;
      isSearch: boolean;
      isShowSearchPhotoForm: boolean;
    }
  >(
    (state) => ({
      //isAuth: state.auth.user !== undefined,
      isSearch: state.search.isSearch,
      isShowSearchPhotoForm: state.search.showForm,
    }),
    shallowEqual
  );

  const showSearchPhotoForm = () => {
    dispatch(showSearchFormAC());
  };

  /*  const hideSearchPhotoForm = () => {
    dispatch(hideSearchFormAC());
  }; */

  const resetSearchState = () => {
    dispatch(resetSearchTermsAC());
  };

  return {
    //isAuth,
    //authLoading,
    isSearch,
    isShowSearchPhotoForm,

    showSearchPhotoForm,
    //hideSearchPhotoForm,
    resetSearchState,
  };
};
