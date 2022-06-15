import React, { useEffect } from "react";
import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import {
  Provider as ReduxProvider,
  useDispatch,
  useSelector,
} from "react-redux";
import thunk from "redux-thunk";
//import Providers from "./../../provider/container/Providers";
//import { initApp } from "./firebase/initApp";
//import { modalReducer, alertReducer, tagsReducer } from "./../../src/store";
//import { photoReducer, searchReducer } from "./../../src/photos";
import { authReducer, useAuth } from "./../../src/auth";
import { usePhotos } from "./../../src/i-photos/loadPhotos";
import { tagsReducer } from "./../../src/tags";
import { searchReducer } from "./../../src/search";
import photoReducer from "./../../src/i-photos/loadPhotos/store/reducer";
import { alertReducer } from "./../../src/alert";
import addEditReducer from "./../../src/i-photos/addEditPhoto/store/reducer";
import favoriteReducer from "./../../src/i-photos/favorite/store/reducer";
import photoSliderReducer from "./../../src/i-photos/photoSlider/store/reducer";
import { showPhotoSliderAC } from "./../../src/i-photos/photoSlider/store/action";
import { PhotoSliderProvider } from "./../../src/i-photos/photoSlider/container/PhotoSlider/PhotoSlider.provider";
import { GlobalState } from "../../src/types";
import Box from "@mui/system/Box";

//CONFIG REDUX
const reducer = combineReducers({
  //modal: modalReducer,
  alert: alertReducer,
  auth: authReducer,
  tags: tagsReducer,
  search: searchReducer,
  loadPhotos: photoReducer,
  addEditPhoto: addEditReducer,
  favorite: favoriteReducer,
  photoSlider: photoSliderReducer,
});

const composeEnhancers = compose;

/**
 * Logs all actions and states after they are dispatched.
 */
const logger = (store) => (next) => (action) => {
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

const Layout = ({ children }) => {
  const dispatch = useDispatch();

  const { photos, loading, error } = usePhotos();

  const activePhotoIndex = useSelector(
    (state) => state.photoSlider.activePhotoIndex
  );

  const { user } = useAuth();

  useEffect(() => {
    dispatch(showPhotoSliderAC(1));

    dispatch({
      type: "AUTH",
      user: {
        uid: "jkFrANbtA4bBEjFsvWWbSOPdt56yt",
        name: "blue",
        email: "wer@mail.ru",
        isEditor: true,
      },
    });
  }, []);

  return (
    <>
      <Box className="p-2 w-14 text-center border-b-2">
        - Photos -{" "}
        {photos === undefined
          ? "undefined"
          : loading === true
          ? "loading"
          : photos.length}{" "}
        | - User -{" "}
        {user === undefined ? "undefined" : `${user.name} - ${user.uid}`} | -
        activePhotoIndex - {activePhotoIndex}
      </Box>
      {photos !== undefined && (
        <PhotoSliderProvider>{children}</PhotoSliderProvider>
      )}
    </>
  );
};

export default (storyFn) => {
  return (
    <ReduxProvider store={store}>
      <Layout>{storyFn()}</Layout>
    </ReduxProvider>
  );
};
