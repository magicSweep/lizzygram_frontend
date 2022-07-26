import React, { FC } from "react";
import {
  numberOfPhotosPerQuery,
  photoCardWidth,
  photoCardHeight,
} from "../../../../config";
import FallbackWidget from "./Fallback";

const Fallback: FC = () => {
  return (
    <FallbackWidget
      numberOfPhotosPerQuery={numberOfPhotosPerQuery}
      photoCardHeight={photoCardHeight}
      photoCardWidth={photoCardWidth}
    />
  );
};

export default Fallback;
