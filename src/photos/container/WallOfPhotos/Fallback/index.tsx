import React, { FC } from "react";
import { numberOfPhotosPerQuery } from "../../../../config";
import FallbackWidget from "./Fallback";

const Fallback: FC = () => {
  return <FallbackWidget numberOfPhotosPerQuery={numberOfPhotosPerQuery} />;
};

export default Fallback;
