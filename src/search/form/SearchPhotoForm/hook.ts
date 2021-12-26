import { batch, useDispatch, useSelector } from "react-redux";
import { setSearchTermsAC, hideSearchFormAC } from "../../store/action";
import { GlobalState } from "../../../types";
import { SearchTerms, SearchPhotoFormData } from "../../types";
import { MutableRefObject, useCallback, useRef } from "react";
import { isDiffSearchState } from "./helper";
import { getOnlyTrueTags } from "../../../utils/app";

export const useSearchPhotoForm = () => {
  const dispatch = useDispatch();

  const searchTerms = useSelector<GlobalState, SearchTerms>(
    (state) => state.search.terms
  );

  const prevSearchTermsRef: MutableRefObject<SearchTerms> = useRef(searchTerms);

  const onClose = useCallback(() => dispatch(hideSearchFormAC()), []);

  const onSubmit = useCallback((data: SearchPhotoFormData) => {
    batch(() => {
      const prevSearchTerms = prevSearchTermsRef.current;

      if (isDiffSearchState(prevSearchTerms, data) === true) {
        dispatch(
          setSearchTermsAC({
            tags: getOnlyTrueTags(data.tags),
            age: parseInt(data.age),
          })
        );
      }
      dispatch(hideSearchFormAC());
    });
  }, []);

  return {
    searchTerms,
    onClose,
    onSubmit,
  };
};
