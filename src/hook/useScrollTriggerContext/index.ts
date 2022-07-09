import { useContext } from "react";
import { ScrollTriggerContext } from "../../container/ScrollTriggerProvider";

export const useScrollTriggerContext = () => {
  const trigger = useContext(ScrollTriggerContext);

  return trigger;
};
