import { Story } from "@storybook/react";
import React, { ComponentProps } from "react";
import TagCheckboxesWidget from "./TagCheckboxes";
//import TagCheckboxes from ".";
import {
  tagsData,
  state as initTagsState,
  defaultTags,
} from "./../../mock/data";

export default {
  component: TagCheckboxesWidget,
  title: "Tags/TagCheckboxes",
  decorators: [
    (story: any) => (
      <div style={{ width: "600px", margin: "auto", paddingTop: "20px" }}>
        {story()}
      </div>
    ),
  ],
  //decorators: [withKnobs],
  // Our exports that end in "Data" are not stories.
  excludeStories: /.*Data$/,
};

const Template: Story<ComponentProps<typeof TagCheckboxesWidget>> = (args) => (
  <TagCheckboxesWidget {...args} />
);

const args: ComponentProps<typeof TagCheckboxesWidget> = {
  tagsState: {
    items: tagsData,
    error: false,
    loading: false,
  },
  tagsFormState: initTagsState,
  onChange: () => console.log("onChange"),
  isFormError: false,
  helperText: "",
  disabled: false,
};

/* export const MainExample = () => (
  <TagCheckboxes
    label="Опишите фото с помощью тэгов:"
    tagsFormState={initTagsState}
    onChange={() => console.log("onChange")}
    errors={[]}
    disabled={false}
  />
); */

export const Tags = Template.bind({});
Tags.args = {
  ...args,
};

export const DefaultValues = Template.bind({});
DefaultValues.args = {
  ...args,
  defaultTags,
};

export const ServerErrorTags = Template.bind({});
(ServerErrorTags as any).args = {
  ...args,
  tagsState: {
    tags: undefined,
    error: true,
    loading: false,
  },
};

export const ValidationErrorTags = Template.bind({});
(ValidationErrorTags as any).args = {
  ...args,
  isFormError: true,
  helperText: "Вы что с ума сошли?",
};

export const DisabledTags = Template.bind({});
(DisabledTags as any).args = {
  ...args,
  disabled: true,
};

export const LoadingTags = Template.bind({});
(LoadingTags as any).args = {
  ...args,
  tagsState: {
    ...args.tagsState,
    loading: true,
  },
};

/* const Form = () => {
  const {
    register,
    handleSubmit,
    setValue,
    clearErrors,
    watch,
    formState,
  } = useForm({
    defaultValues: {
      tags: initTagsState,
    },
  });

  useEffect(() => {
    register("tags", tagsRules);
  }, [register]);

  // tagsState = { tag_id: boolean } - in input checkbox we use name={tag._id}
  const tagsState = watch("tags");

  const onCheckboxChange = (event: any) => {
    //console.log("onCheckboxChange", event.target);
    //const newState = { ...state, [event.target.name]: event.target.checked };
    const newState = {
      ...tagsState,
      [event.target.name]: event.target.checked,
    };
    clearErrors("tags");
    setValue("tags", newState);
    //setState(newState);
  };

  //console.log("RENDER TAGS STORIES FORM");

  return (
    <form
      onSubmit={handleSubmit((data: any) => console.log("SUBMIT", data))}
    >
      <TagCheckboxes
        label={"Опишите фото с помощью тэгов"}
        tagsState={{
          tags: tagsData,
          error: false,
          loading: false,
        }}
        tagsFormState={tagsState}
        onChange={onCheckboxChange}
        error={formState.errors.tags}
        disabled={false}
      />
      <br />
      <button type="submit">Go</button>
    </form>
  );
};
 

export const Default = () => {
  return <Form />;
};*/
