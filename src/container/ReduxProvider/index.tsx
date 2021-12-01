import React, { FC } from "react";
//import ErrorBoundary from "./../../component/ErrorBoundary";

import {
  createStore,
  combineReducers,
  applyMiddleware,
  compose,
  Middleware,
} from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
//import Providers from "./../../provider/container/Providers";
//import { initApp } from "./firebase/initApp";
//import { modalReducer, alertReducer, tagsReducer } from "./../../store";
import { searchReducer } from "./../../search";
import { photoReducer } from "./../../photos";
import { authReducer } from "./../../auth";
import { themeReducer } from "../../theme";
import { tagsReducer } from "./../../tags";
import { alertReducer } from "./../../alert";

//CONFIG REDUX
const reducer = combineReducers({
  /*  modal: modalReducer,*/
  alert: alertReducer,
  tags: tagsReducer,
  search: searchReducer,
  photos: photoReducer,
  auth: authReducer,
  theme: themeReducer,
});

const composeEnhancers = compose;

/**
 * Logs all actions and states after they are dispatched.
 */
const logger: Middleware<any, {}, any> = (store) => (next) => (action) => {
  console.group(action.type);
  console.info("DISPATCHING");
  console.info("ACTION", action);
  console.info("PREV STORE", store.getState());
  let result = next(action);
  console.log("NEW STORE", store.getState());
  console.groupEnd();
  return result;
};

const middleware = [thunk, logger]; //sagaMiddleware, thunk

const store = createStore(
  reducer,
  composeEnhancers(applyMiddleware(...middleware))
);

export type ReduxProviderProps = {
  children: any;
};

export const ReduxProvider: FC<ReduxProviderProps> = ({ children }) => {
  //console.log("RENDER REDUX PROVIDER");

  return <Provider store={store}>{children}</Provider>;
};

/*  <ErrorBoundary>
      <ReduxProvider store={store}>{element}</ReduxProvider>
    </ErrorBoundary> */
