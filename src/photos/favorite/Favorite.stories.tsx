import { ComponentStory, ComponentMeta } from "@storybook/react";
import { useDispatch, useSelector } from "react-redux";
import { GlobalState } from "./../../types";
import Alerts from "../../alert/container/Alerts";
import usePhotos from "../loadPhotos/hook/usePhotos";
import { FavoriteState } from "./types";
import EditIconBtn from "../../component/EditIconBtn";
import Box from "@mui/system/Box";
import FavoriteIconBtn from "./component/FavoriteIconBtn";
import { FirestoreDate, Photo } from "lizzygram-common-data/dist/types";
import { useFavorite } from "./hook";

export default {
  title: "FavoritePhoto",
  component: FavoriteIconBtn,
  /*  argTypes: {
    backgroundColor: { control: 'color' },
  }, */
} as ComponentMeta<typeof FavoriteIconBtn>;

//const Template: ComponentStory<any> = (args) => <AddPhotoManager {...args} />;

const Wrapper = () => {
  const dispatch = useDispatch();

  const {
    loading,
    error,
    searchState,
    photos,
    hasNextPage,
    nextPageDocRef,
    loadPhotos,
    loadMore,
    //editedPhotosIds,
    //numberOfAddedPhotoReqs,
  } = usePhotos();

  /* const favoriteReqs = useSelector<GlobalState, FavoriteState["favoriteReqs"]>(
    (state) => state.favorite.favoriteReqs
  ); */

  const useFavoriteReturn = useFavorite("favoriteTestUser");

  const favoriteBy =
    photos === undefined
      ? undefined
      : (photos as any[]).find((photo) => photo.id === "1532390460203")
          .favoriteBy;

  return (
    <>
      <Box bgcolor="secondary.main" className="m-6 text-center">
        <FavoriteIconBtn
          photoId="1532390460203"
          userUid="favoriteTestUser"
          favoriteBy={favoriteBy}
          {...useFavoriteReturn}
        />
        {/* <EditIconBtn
          onClick={() => dispatch(editPhotoRequestStartAC("1532390460203"))}
          tooltipTitle="Edit btn"
          tooltipPlacement="left"
          ariaLabel="edit photo"
          fill="white"
          iconSize="small"
        /> */}
      </Box>
      <div className="text-left border-2 p-2 border-yellow-200  rounded w-3/4 m-auto overflow-hidden">
        <p>
          -- nextPageDocRef -{" "}
          {nextPageDocRef === undefined
            ? "undefined"
            : nextPageDocRef === null
            ? "null"
            : nextPageDocRef.toString()}
        </p>
        <p>-- error - {error.toString()}</p>
        <p>-- loading - {loading.toString()}</p>
        <p>-- favoriteReqs - {useFavoriteReturn.favoriteReqs.toString()}</p>
        <p>
          <ul>--photos: </ul>
          {photos !== undefined
            ? photos.map((photo) =>
                photo.id === "1532390460203" ? (
                  <li key={photo.id}>{` |||-- ${photo.id} - [ addedBy ${
                    photo.addedByUserUID
                  }] - [ favoriteBy: ${JSON.stringify(
                    photo.favoriteBy
                  )}] --||| `}</li>
                ) : (
                  <li
                    key={photo.id}
                  >{` | ${photo.id} - ${photo.addedByUserUID} | `}</li>
                )
              )
            : "undefined"}
        </p>
      </div>

      <Alerts />
    </>
  );
};

export const Default = () => <Wrapper />;
