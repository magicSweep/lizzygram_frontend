import { useSelector, shallowEqual } from "react-redux";
import { GlobalState } from "../../../types";

const useIsSearch = () => {
  const isSearch = useSelector<GlobalState, boolean>(
    (state) => state.search.isSearch,
    shallowEqual
  );

  return {
    isSearch,
  };
};

export default useIsSearch;
