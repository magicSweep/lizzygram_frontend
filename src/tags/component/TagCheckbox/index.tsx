import React, {
  ComponentProps,
  FC,
  forwardRef,
  ForwardRefExoticComponent,
  ForwardRefRenderFunction,
  RefAttributes,
} from "react";
import { tagTypeToColor } from "../../helper";
import { TagType } from "../../types";
import { elif, compose } from "fmagic";
import Button, { ButtonProps } from "@mui/material/Button";

export type TagClickableProps = ComponentProps<typeof Button> & {
  tagType: TagType;
  disabled: boolean;
  checked: boolean;
};

/* const getTagClickableColor = (
  tagType: TagType,
  disabled: boolean,
  checked: boolean
) =>
  elif(
    () => disabled === true || checked === false,
    () => "action.disabled",
    compose(
      tagTypeToColor,
      (tagColor: ReturnType<typeof tagTypeToColor>) => `${tagColor}.main`
    )
  )(tagType); */

const getTagClickableColors = (
  tagType: TagType,
  disabled: boolean,
  checked: boolean
): { bgcolor: string; hoverBgcolor: string; color: ButtonProps["color"] } =>
  elif(
    () => disabled === true || checked === false,
    () => ({
      hoverBgcolor: "#9e9e9e",
      bgcolor: "#bdbdbd",
      color: tagTypeToColor(tagType),
    }),
    () => ({
      hoverBgcolor: undefined,
      bgcolor: undefined,
      color: tagTypeToColor(tagType),
    })
  )();

export const TagClickable: FC<TagClickableProps> = ({
  tagType,
  disabled,
  checked,
  children,
  ...props
}) => {
  const { hoverBgcolor, bgcolor, color } = getTagClickableColors(
    tagType,
    disabled,
    checked
  );

  //console.log("[RENDER CHECKBOX]");

  return (
    <Button
      variant="contained"
      color={color}
      disableElevation={true}
      disabled={disabled}
      sx={{
        bgcolor,
        cursor: disabled === true ? "default" : "pointer",
        textTransform: "lowercase",
        borderRadius: "2px",
        px: "12px",
        height: "24px",
        fontSize: "12px",
        "&.Mui-disabled": {
          bgcolor,
        },
        "&:hover": {
          bgcolor: hoverBgcolor,
        },
      }}
      {...props}
    >
      {`#${children}`}
    </Button>
  );
};

export type TagCheckboxProps = TagClickableProps &
  ComponentProps<"input"> & {
    label: string;
  };

const TagCheckbox = forwardRef<HTMLInputElement, TagCheckboxProps>(
  ({ tagType, label, ...props }, ref) => {
    return (
      <>
        <TagClickable
          //@ts-ignore
          component="label"
          htmlFor={props.id}
          tagType={tagType}
          disabled={props.disabled}
          checked={props.checked}
        >
          {label}
        </TagClickable>
        <input
          className="hidden"
          /* ref={inputRef} */
          type={"checkbox"}
          ref={ref}
          {...props}
        />
      </>
    );
  }
);

export default TagCheckbox;
