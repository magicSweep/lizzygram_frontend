//import { useEditor } from "../../../auth/hook/useEditor";
import { useLogin } from "../../hook/useLogin";
import { useLogout } from "../../hook/useLogout";
import { useAuth } from "../../hook/useAuth";
import { useAuthSubscribe } from "../../hook/useAuthSubscribe";

export const useAuthAppBarBtn = () => {
  useAuthSubscribe();

  const { user, loading } = useAuth();

  const { login } = useLogin();

  const { logout } = useLogout();

  return {
    user,
    loading,
    logout,
    login,
  };
};
