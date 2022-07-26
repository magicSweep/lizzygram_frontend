import React, { useEffect } from "react";
import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import {
  batch,
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
import { addPhotoAC, usePhotos } from "./../../src/photos/loadPhotos";
import { tagsReducer } from "./../../src/tags";
import { searchReducer } from "./../../src/search";
import photoReducer from "./../../src/photos/loadPhotos/store/reducer";
import { alertReducer } from "./../../src/alert";
import addEditReducer from "./../../src/photos/addEditPhoto/store/reducer";
import favoriteReducer from "./../../src/photos/favorite/store/reducer";
import photoSliderReducer from "./../../src/photos/photoSlider/store/reducer";
import { photos } from "./../../src/photos/loadPhotos/fake-data/photos.db";
import { WallOfPhotosProvider } from "./../../src/photos/wallOfPhotos/container/WallOfPhotos.provider";
import Box from "@mui/system/Box";
import { Button } from "@mui/material";
import {
  editPhotoRequestSendAC,
  editPhotoRequestSuccessAC,
  addPhotoRequestSendAC,
  addPhotoRequestSuccessAC,
} from "../../src/photos/addEditPhoto";
import wait from "waait";

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

  const { photos, loading } = usePhotos();

  const activePhotoIndex = useSelector(
    (state) => state.photoSlider.activePhotoIndex
  );

  const { user } = useAuth();

  const editPhoto = async () => {
    dispatch(editPhotoRequestSendAC("1532390460203"));

    await wait(3000);

    dispatch(editPhotoRequestSuccessAC("1532390460203"));
  };

  const addPhoto = async () => {
    const photoToAdd = photos[3];

    photoToAdd.id = "1531699239111";

    dispatch(addPhotoRequestSendAC());

    await wait(3000);

    batch(() => {
      dispatch(addPhotoRequestSuccessAC());

      dispatch(addPhotoAC(photoToAdd));
    });
  };

  const auth = () => {
    dispatch({
      type: "AUTH",
      user: {
        uid: "jkFrANbtA4bBEjFsvWWbSOPdt56yt",
        name: "blue",
        email: "wer@mail.ru",
        isEditor: true,
      },
    });
  };

  /*  useEffect(() => {
    auth();
  }, []); */

  return (
    <>
      <Box className="p-2 w-14 text-center border-b-2">
        <Button onClick={auth}>auth</Button>
        <span> | </span>
        <Button onClick={editPhoto}>edit photo</Button>
        <span> | </span>
        <Button onClick={addPhoto}>add photo</Button>- Photos -{" "}
        {photos === undefined
          ? "undefined"
          : loading === true
          ? "loading"
          : photos.length}{" "}
        | - User -{" "}
        {user === undefined ? "undefined" : `${user.name} - ${user.uid}`} | -
        activePhotoIndex - {activePhotoIndex}
      </Box>
      <WallOfPhotosProvider>{children}</WallOfPhotosProvider>
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
