import { ComponentStory, ComponentMeta } from "@storybook/react";
import { useSelector } from "react-redux";
import { GlobalState } from "./../../types";

import AddPhotoManager from "./add/container/AddPhotoManager";
import Alerts from "../../alert/container/Alerts";
import usePhotos from "../loadPhotos/hook/usePhotos";
import AddPhotoBtn from "./add/container/AddPhotoBtn";
import { AddEditPhotoState } from "./types";

export default {
  title: "AddPhoto",
  component: AddPhotoManager,
  /*  argTypes: {
    backgroundColor: { control: 'color' },
  }, */
} as ComponentMeta<typeof AddPhotoManager>;

//const Template: ComponentStory<any> = (args) => <AddPhotoManager {...args} />;

const Wrapper = () => {
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

  const {
    reqIds: addedPhotosReqIds,
    numberOfActiveReqs: numberOfAddedPhotoReqs,
  } = useSelector<GlobalState, AddEditPhotoState["addReqs"]>(
    (state) => state.addEditPhoto.addReqs
  );

  return (
    <div>
      <div className="text-left w-1/2 border-2 p-2 border-yellow-200  rounded">
        <p>
          - nextPageDocRef -{" "}
          {nextPageDocRef === undefined
            ? "undefined"
            : nextPageDocRef === null
            ? "null"
            : nextPageDocRef.toString()}
        </p>
        <p>error - {error.toString()}</p>
        <p>loading - {loading.toString()}</p>
        <p>numberOfAddedPhotoReqs - {numberOfAddedPhotoReqs}</p>
        <p>addedPhotosIds - {addedPhotosReqIds.toString()}</p>
        <p>
          photos -{" "}
          {photos !== undefined
            ? photos.map(
                (photo) => ` | ${photo.id} - ${photo.addedByUserUID} | `
              )
            : "undefined"}
        </p>
      </div>
      <AddPhotoManager />
      <AddPhotoBtn />
      <Alerts />
    </div>
  );
};

export const Default = () => <Wrapper />;

/* export const Test = () => {
  return (
    <form
      onSubmit={(event: any) => console.log("FORM ON SUBMIT")}
      onClick={(event: any) => console.log("FORM CLICK")}
    >
      <button
        type="button"
        onClick={(event: any) => {
          event.stopPropagation();
          console.log("BTN CLOSE CLICK");
        }}
      >
        Close
      </button>
      <button>Submit</button>
    </form>
  );
}; */
