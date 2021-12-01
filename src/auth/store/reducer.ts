import { Reducer } from "redux";
import { getUser } from "../service/UserService";
import { AuthState, AuthAction, AuthUser } from "./../types";

//export const localStorageKey = "lg_super_puper_user";

//const initUser = typeof window === "undefined" ? null : getUser();
//const initLoading = initUser === null;

const authInitialState: AuthState = {
  user: null,
  loading: true,
  //loginLoading: false,
  //logoutLoading: false,
  //forgetPassLoading: false,
  loginError: false,
  logoutError: false,
  //forgetPassError: false,
};

const reducer: Reducer<AuthState, AuthAction> = (
  state = authInitialState,
  action: AuthAction
) => {
  switch (action.type) {
    case "AUTH":
      return {
        ...state,
        user: action.user,
        loading: false,
      };
    case "LOGIN_REQUEST":
      return {
        ...state,
        loading: true,
        loginError: false,
      };
    /*  case "LOGIN_REQUEST_SUCCESS":
      return {
        ...state,
        //user: { ...state.user, isEditor: action.isEditor },
        loading: false,
        loginError: false,
      }; */
    case "LOGIN_REQUEST_ERROR":
      return {
        ...state,
        loading: false,
        loginError: true,
      };
    case "LOGOUT_REQUEST":
      return {
        ...state,
        //logoutLoading: true,
        loading: true,
        logoutError: false,
      };
    /*  case "LOGOUT_REQUEST_SUCCESS":
      return {
        ...state,
        //logoutLoading: false,
        loading: false,
        logoutError: false,
      }; */
    case "LOGOUT_REQUEST_ERROR":
      return {
        ...state,
        //logoutLoading: false,
        loading: false,
        logoutError: true,
      };
    /*  case "FORGET_PASS_REQUEST":
      return {
        ...state,
        forgetPassLoading: true,
        forgetPassError: false,
      };
    case "FORGET_PASS_SUCCESS":
      return {
        ...state,
        forgetPassLoading: false,
        forgetPassError: false,
      };
    case "FORGET_PASS_ERROR":
      return {
        ...state,
        forgetPassLoading: false,
        forgetPassError: true,
      }; */
    default:
      return state;
  }
};

export default reducer;
