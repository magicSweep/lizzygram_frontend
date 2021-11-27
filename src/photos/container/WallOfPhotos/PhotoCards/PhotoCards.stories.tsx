import PhotoCards, { PhotoCardsProps } from ".";
import { photos } from "./../../../mock/fake.data";
import { Story } from "@storybook/react";
//import { tagsData } from "../../../component/FormElements/TagsCheckbox/data";

/* const tagsState = {
  tags: tagsData,
  loading: false,
  error: false,
}; */

export default {
  component: PhotoCards,
  title: "Photos/WallOfPhotos/PhotoCards",
};

const Template: Story<PhotoCardsProps> = (args) => (
  <div className="flex justify-center flex-wrap">
    <PhotoCards {...args} />
  </div>
);

/* photos,
  loadMorePhotos,
  reLoadPhotos,
  hasNextPage,
  loading,
  error, */

//const numberOfPhotosPerQuery = 3;

export const Default = Template.bind({}) as any;
Default.args = {
  isShowPhotoSlider: false,
  indexObservable: 3,
  numberOfPhotosPerQuery: 1,
  photos: photos,
  showPhotoSlider: () => console.log("showPhotoSlider"),
  showEditPhotoForm: () => console.log("showEditPhotoForm"),
  numberOfAddedPhotos: 0,
  editedPhotoIds: [],
  userUID: "user13",
  hasNextPage: true,
};

export const ShowPhotoSlider = Template.bind({}) as any;
ShowPhotoSlider.args = {
  isShowPhotoSlider: true,
  indexObservable: 0,
  numberOfPhotosPerQuery: 3,
  photos: photos,
  showPhotoSlider: () => console.log("showPhotoSlider"),
  showEditPhotoForm: () => console.log("showEditPhotoForm"),
  numberOfAddedPhotos: 0,
  editedPhotoIds: [],
  userUID: "user13",
  hasNextPage: true,
};
