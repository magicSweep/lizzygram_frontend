import { ComponentStory, ComponentMeta } from "@storybook/react";
import { useSelector } from "react-redux";
import { GlobalState } from "./../../../types";

import AddPhotoReqs from "./AddPhotoReqs";
import Alerts from "../../../alert/container/Alerts";
import { usePhotos } from "../../hook/usePhotos";
import AddPhotoBtn from "../../component/AddPhotoBtn/AddPhotoBtn";

export default {
  title: "Photos/AddPhotoReqs",
  component: AddPhotoReqs,
  /*  argTypes: {
    backgroundColor: { control: 'color' },
  }, */
} as ComponentMeta<typeof AddPhotoReqs>;

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
    editedPhotosIds,
    numberOfAddedPhotoReqs,
  } = usePhotos();

  const reqIds = useSelector<GlobalState, string[]>(
    (state) => state.photos.addReqs.reqIds
  );

  return (
    <div>
      <div className="text-left w-1/2 border-2 p-2 border-yellow-200  rounded">
        <p>nextPageDocRef - {nextPageDocRef}</p>
        <p>error - {error ? "true" : "false"}</p>
        <p>loading - {loading ? "true" : "false"}</p>
        <p>numberOfAddedPhotoReqs - {numberOfAddedPhotoReqs}</p>
        <p>addedPhotosIds - {JSON.stringify(reqIds)}</p>
        <p>editedPhotosIds - {JSON.stringify(editedPhotosIds)}</p>
        <p>
          photos -{" "}
          {photos
            ? photos.map((photo) => ` | ${photo.id} - ${photo.description} | `)
            : "undefined"}
        </p>
      </div>
      <AddPhotoReqs requests={reqIds} />
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
