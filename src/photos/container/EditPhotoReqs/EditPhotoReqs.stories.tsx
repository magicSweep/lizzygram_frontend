import { ComponentMeta } from "@storybook/react";
import { useDispatch, useSelector } from "react-redux";
import { GlobalState } from "./../../../types";

import EditPhotoReqs from "./EditPhotoReqs";
import Alerts from "../../../alert/container/Alerts";
import { usePhotos } from "../../hook/usePhotos";
import { editPhotoStartRequestAC } from "../../store/action";
import Button from "@mui/material/Button";

export default {
  title: "Photos/Container/EditPhotoReqs",
  component: EditPhotoReqs,
  /*  argTypes: {
    backgroundColor: { control: 'color' },
  }, */
} as ComponentMeta<typeof EditPhotoReqs>;

//const Template: ComponentStory<any> = (args) => <AddPhotoManager {...args} />;

const Wrapper = () => {
  //const photosState = useSelector((state: GlobalState) => state.photos);

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
    editedPhotosIds,
    numberOfAddedPhotoReqs,
  } = usePhotos();

  const reqIds = useSelector<GlobalState, string[]>(
    (state) => state.photos.editReqs.reqIds
  );

  /* export interface PhotosAction extends Action<any> {
  
  photos?: IPhoto[];
  photo?: IPhoto;
  photoId?: string;
  hasNextPage?: boolean;
  nextPageDocRef?: any;
 
}
 */

  return (
    <div>
      <div className="text-left w-1/2 border-2 p-2 border-yellow-200  rounded">
        <p>
          nextPageDocRef -{" "}
          {nextPageDocRef === undefined ? "undefined" : nextPageDocRef.id}
        </p>
        <p>error - {error ? "true" : "false"}</p>
        <p>loading - {loading ? "true" : "false"}</p>
        <p>numberOfAddedPhotoReqs - {numberOfAddedPhotoReqs}</p>
        <p>activeEditedPhotosIds - {JSON.stringify(editedPhotosIds)}</p>
        <p>editedPhotosIds - {JSON.stringify(reqIds)}</p>
        <p>
          photos -
          {photos !== undefined
            ? photos.map(
                (photo: any) => ` | ${photo.id} - ${photo.description} | `
              )
            : "undefined"}
        </p>
      </div>
      <EditPhotoReqs requests={reqIds} />
      <Button
        onClick={() => dispatch(editPhotoStartRequestAC("1532390460203"))}
      >
        Edit photo
      </Button>
      <Alerts />
    </div>
  );
};

export const Default = () => <Wrapper />;
