import { ComponentStory, ComponentMeta } from "@storybook/react";
import { useDispatch, useSelector } from "react-redux";
import { GlobalState } from "./../../types";

import EditPhotoManager from "./edit/container/EditPhotoManager";
import Alerts from "../../alert/container/Alerts";
import usePhotos from "../loadPhotos/hook/usePhotos";
import { AddEditPhotoState } from "./types";
import EditIconBtn from "../../component/EditIconBtn";
import Box from "@mui/system/Box";
import { editPhotoStartRequestAC } from "./store/action";

export default {
  title: "EditPhoto",
  component: EditPhotoManager,
  /*  argTypes: {
    backgroundColor: { control: 'color' },
  }, */
} as ComponentMeta<typeof EditPhotoManager>;

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

  const { reqIds: editedPhotosReqIds, activeReqIds } = useSelector<
    GlobalState,
    AddEditPhotoState["editReqs"]
  >((state) => state.addEditPhoto.editReqs);

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
        <p>activeReqIds - {activeReqIds.toString()}</p>
        <p>editedPhotosIds - {editedPhotosReqIds.toString()}</p>
        <p>
          photos -{" "}
          {photos !== undefined
            ? photos.map(
                (photo) => ` | ${photo.id} - ${photo.addedByUserUID} | `
              )
            : "undefined"}
        </p>
      </div>
      <EditPhotoManager />
      <Box bgcolor="secondary.main">
        <EditIconBtn
          onClick={() => dispatch(editPhotoStartRequestAC("1532390460203"))}
          tooltipTitle="Edit btn"
          tooltipPlacement="left"
          ariaLabel="edit photo"
          fill="white"
          iconSize="small"
        />
      </Box>

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
