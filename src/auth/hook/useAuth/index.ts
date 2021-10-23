import { AuthUser } from "../../types";
import { useSelector, shallowEqual } from "react-redux";
import { GlobalState } from "../../../types";

export const useAuth = () => {
  const { user, loading } = useSelector<
    GlobalState,
    {
      user: AuthUser | undefined;
      loading: boolean;
    }
  >(
    (state) => ({
      user: state.auth.user,
      loading: state.auth.loading,
    }),
    shallowEqual
  );

  return {
    user,
    loading,
  };
};
