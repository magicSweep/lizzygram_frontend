import { useSelector, shallowEqual } from "react-redux";
import { GlobalState } from "../../../types";
import { SearchTerms } from "../../types";

/* export const useSearchState = () => {
  const searchState = useSelector<GlobalState, SearchState>(
    (state) => state.search,
    shallowEqual
  );

  return {
    searchState,
  };
}; */

const useSearchTerms = () => {
  const searchTerms = useSelector<GlobalState, SearchTerms>(
    (state) => state.search.terms,
    shallowEqual
  );

  return {
    searchTerms,
  };
};

export default useSearchTerms;
