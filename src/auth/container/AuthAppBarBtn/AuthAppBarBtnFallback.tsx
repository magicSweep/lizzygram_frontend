import React, { FC } from "react";
import LoadingWrapperWidget from "../../../component/LoadingWrapper/LoadingWrapperWidget";
//import { LockIconBtn } from "../../component/LockIconBtn";
import LockIcon from "@mui/icons-material/Lock";

const Fallback: FC = () => (
  <div className="inline-block relative">
    <LoadingWrapperWidget circle={true} />
    <div className="min-w-44 min-h-44 flex items-center justify-center">
      <LockIcon color="inherit" fontSize="small" />
    </div>
    {/* <LockIconBtn disabled={true} /> */}
  </div>
);

export default Fallback;
