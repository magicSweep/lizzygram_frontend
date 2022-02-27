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

export const Default = Template.bind({});
Default.args = {
  photos: photos,
  showPhotoSlider: () => console.log("showPhotoSlider"),
  showEditPhotoForm: () => console.log("showEditPhotoForm"),
  editedPhotoIds: [],
  userUid: "user13",
  isEditor: false,
};

const newPhotos = [...photos];
newPhotos.unshift(null);
newPhotos.unshift(null);

export const AddAndEditPhotos = Template.bind({});
AddAndEditPhotos.args = {
  photos: newPhotos,
  showPhotoSlider: () => console.log("showPhotoSlider"),
  showEditPhotoForm: () => console.log("showEditPhotoForm"),
  editedPhotoIds: ["3309", "334477"],
  userUid: "user13",
  isEditor: true,
};
