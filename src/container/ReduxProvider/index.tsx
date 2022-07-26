import React, { FC } from "react";
import { Provider } from "react-redux";
import { configureStore, Middleware } from "@reduxjs/toolkit";
//import thunk from "redux-thunk";
import { themeReducer } from "../../theme";
import { authReducer } from "./../../auth";
import { tagsReducer } from "./../../tags";
import { searchReducer } from "./../../search";
import { loadPhotosReducer } from "./../../photos/loadPhotos";
import { alertReducer } from "./../../alert";
import { addEditReducer } from "./../../photos/addEditPhoto";
import { favoriteReducer } from "./../../photos/favorite";
import { photoSliderReducer } from "./../../photos/photoSlider";

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

//CONFIG REDUX
const store = configureStore({
  reducer: {
    alert: alertReducer,
    tags: tagsReducer,
    search: searchReducer,
    auth: authReducer,
    theme: themeReducer,
    loadPhotos: loadPhotosReducer,
    addEditPhoto: addEditReducer,
    favorite: favoriteReducer,
    photoSlider: photoSliderReducer,
  },
  middleware: [logger],
});

//const composeEnhancers = compose;

/* const middleware = [thunk, logger]; //sagaMiddleware, thunk

const store = createStore(
  reducer,
  composeEnhancers(applyMiddleware(...middleware))
); */

export type ReduxProviderProps = {
  children: any;
};

const ReduxProvider: FC<ReduxProviderProps> = ({ children }) => {
  //console.log("RENDER REDUX PROVIDER");
  // @ts-ignore
  return <Provider store={store}>{children}</Provider>;
};

export default ReduxProvider;

/*  <ErrorBoundary>
      <ReduxProvider store={store}>{element}</ReduxProvider>
    </ErrorBoundary> */
