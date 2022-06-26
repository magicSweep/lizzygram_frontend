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
import { themeReducer } from "../../theme/store/reducer";
import { authReducer } from "./../../auth";
import { tagsReducer } from "./../../tags";
import { searchReducer } from "./../../search";
import { loadPhotosReducer } from "./../../i-photos/loadPhotos";
import { alertReducer } from "./../../alert";
import { addEditReducer } from "./../../i-photos/addEditPhoto";
import { favoriteReducer } from "./../../i-photos/favorite";
import { photoSliderReducer } from "./../../i-photos/photoSlider";

//CONFIG REDUX
const reducer = combineReducers({
  /*  modal: modalReducer,*/
  alert: alertReducer,
  tags: tagsReducer,
  search: searchReducer,
  auth: authReducer,
  theme: themeReducer,
  loadPhotos: loadPhotosReducer,
  addEditPhoto: addEditReducer,
  favorite: favoriteReducer,
  photoSlider: photoSliderReducer,
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
  // @ts-ignore
  return <Provider store={store}>{children}</Provider>;
};

/*  <ErrorBoundary>
      <ReduxProvider store={store}>{element}</ReduxProvider>
    </ErrorBoundary> */
