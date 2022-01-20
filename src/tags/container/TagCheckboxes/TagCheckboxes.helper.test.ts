import TagCheckbox from "../../component/TagCheckbox";
//import FormFieldWrapper from "../../../component/FormElements/UploadButton/FormFieldWrapper";
//import Typography, { TypographyProps } from "@mui/material/Typography";
import { BoxProps } from "@mui/material/Box";
import { numberOfTagsByType, tagsTitleByType } from "../../../config";
import HeroTitle from "../../../component/HeroTitle";
import { TagsState, TagData, TagsFormState, TagType } from "../../types";
import TagSkeleton from "../../component/TagSkeleton";
import { tagTypeToColor } from "../../helper";
import FieldWrapper from "../../../component/formElements/FieldWrapper";
import { TagDataGroupedByType } from "./TagCheckboxes";
import { tagsData } from "../../mock/data";
import { ButtonProps } from "@mui/material";
import { makeGroupedTags } from "./TagCheckboxes.helper";

describe("makeGroupedTags", () => {
  test("", () => {
    const result = makeGroupedTags(tagsData);

    expect(result).toEqual([
      {
        tags: [
          {
            id: "bCcRcxADj2xP9fkSXNpH",
            name: "zuganov",
            title: "зюганов",
            type: "feeling",
          },
          {
            id: "WX6CY5kGx4FXvdZR6g8E",
            name: "smile",
            title: "улыбка",
            type: "feeling",
          },
          {
            id: "ieYx4ke8ms0DJb5APv4u",
            name: "thoughtfully",
            title: "задумчиво",
            type: "feeling",
          },
        ],
        type: "feeling",
      },
      {
        tags: [
          {
            id: "vekwWqVY1yYRd3XeERmd",
            name: "pets",
            title: "с животными",
            type: "withWho",
          },
          {
            id: "vekwWqVY1yYRd3XeER12",
            name: "parents",
            title: "с родителями",
            type: "withWho",
          },
          {
            id: "vekwWqVY1222d3XeERmd",
            name: "grandmother",
            title: "с бабушкой",
            type: "withWho",
          },
          {
            id: "vekwWqVY1222eeXeERmd",
            name: "man",
            title: "с дядей",
            type: "withWho",
          },
        ],
        type: "withWho",
      },
      {
        tags: [
          {
            id: "rNNyXhgNJUjsbGFzVGAL",
            name: "street",
            title: "на улице",
            type: "where",
          },
          {
            id: "ybrq9aFZlTk71akoH7Lz",
            name: "home",
            title: "дома",
            type: "where",
          },
          {
            id: "fYZ3uqG1vBLFH75Y0rjM",
            name: "nature",
            title: "на природе",
            type: "where",
          },
        ],
        type: "where",
      },
    ]);
  });
});
