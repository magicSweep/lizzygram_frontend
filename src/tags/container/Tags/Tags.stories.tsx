import Tags from ".";
import { tagsData } from "../../mock/data";
//import {Story} from "@s"

const photo = {
  id: "123ic",
  iconSrc: "",
  photo: {
    tags: {
      vekwWqVY1yYRd3XeER12: true,
      WX6CY5kGx4FXvdZR6g8E: true,
      //fYZ3uqG1vBLFH75Y0rjM: true,
      //bCcRcxADj2xP9fkSXNpH: false,
    },
    date: new Date("2018-11-23"),
    description: "",
  },
};

export default {
  component: Tags,
  title: "Tags/TagsWidget",
  decorators: [
    (story: any) => (
      <div
        style={{
          padding: "50px 10px 10px",
          width: "500px",
          margin: "auto",
          borderRadius: "4px",
          border: "1px solid lightgray",
        }}
      >
        {story()}
      </div>
    ),
  ],
  //decorators: [withKnobs],
  // Our exports that end in "Data" are not stories.
  excludeStories: /.*Data$/,
};

const Template = (args: any) => <Tags {...args} />;

export const Default = Template.bind({});
(Default as any).args = {
  tags: tagsData,
  error: false,
  loading: false,
  photoTags: photo.photo.tags,
};

export const LoadingTags = Template.bind({});
(LoadingTags as any).args = {
  tags: tagsData,
  error: false,
  loading: true,
  //photo,
};

export const ErrorTags = Template.bind({});
(ErrorTags as any).args = {
  tags: tagsData,
  error: true,
  loading: false,
  //photo,
};
