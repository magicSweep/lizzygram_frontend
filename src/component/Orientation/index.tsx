import React, { FC } from "react";
import useOrientation from "../../hook/useOrientation";
import OrientationWidget from "./OrientationWidget";

const Orientation: FC<{}> = () => {
  const { change } = useOrientation();

  return <OrientationWidget title="Повернуть" change={change} />;
};

export default Orientation;
