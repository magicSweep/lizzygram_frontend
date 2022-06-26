import React, { FC } from "react";
import Tooltip from "@mui/material/Tooltip";
import InfoIcon from "@mui/icons-material/Info";
import { FirestoreTagsData } from "../../../../tags/types";
import Tags from "../../../../tags/container/Tags";
import { makeYearsOldStringify, getDate } from "./../../../../utils/app";
import { getBuildFor } from "lizzygram-common-data";
import { BuildFor } from "lizzygram-common-data/dist/types";

export type DescTooltipedIconProps = {
  date: Date;
  desc?: string;
  photoTags: FirestoreTagsData;
};

export const DescTooltipedIcon_: (
  buildFor: BuildFor
) => FC<DescTooltipedIconProps> =
  (buildFor) =>
  ({ date, desc, photoTags }) => {
    const [open, setOpen] = React.useState(false);

    /* const handleTooltipClose = () => {
    setOpen(false);
  };

  const handleTooltipOpen = () => {
    setOpen(true);
  }; */

    const toggleTooltip = () => {
      setOpen((open) => !open);
    };

    const finalDate = getDate(date);

    const yearsOldFormated = makeYearsOldStringify(finalDate);

    return (
      <Tooltip
        placement="top-end"
        arrow
        //onClose={handleTooltipClose}
        disableFocusListener
        disableHoverListener
        disableTouchListener
        open={open}
        title={
          <>
            {buildFor === "lizzygram" && (
              <p className="pb-1">Boзраст: {yearsOldFormated}.</p>
            )}
            {desc !== undefined && desc.length > 0 && (
              <p className="block w-full max-h-16 overflow-hidden mb-2">
                Комментарий: {desc}
              </p>
            )}
            <p>
              Тэги: <Tags photoTags={photoTags} isTexted={true} />
            </p>
          </>
        }
      >
        <InfoIcon
          onClick={toggleTooltip}
          sx={{ fill: "white", /* mr: "20px", */ cursor: "pointer" }}
          fontSize="small"
        />
      </Tooltip>
    );
  };

const DescTooltipedIcon = DescTooltipedIcon_(getBuildFor());

export default DescTooltipedIcon;
