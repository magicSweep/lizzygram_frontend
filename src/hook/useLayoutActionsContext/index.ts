import { useContext } from "react";
import { LayoutActionsContext } from "../../container/LayoutActionsProvider";

export const useLayoutActionsContext = () => {
  const trigger = useContext(LayoutActionsContext);

  return trigger;
};
