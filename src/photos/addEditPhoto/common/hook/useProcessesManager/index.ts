import { useSelector } from "react-redux";
import { GlobalState } from "../../../../../types";
//import ProcessesManager from "../ProcessesManager";
//import loadable from "@loadable/component";

let init = false;

export type ProcessesManagerProps = {
  //doesRender: boolean;
  selector: (state: any) => string[];
};

const useProcessesManager = (selector: (state: any) => string[]) => {
  //const initRef = useRef(false);

  const processesIds = useSelector<GlobalState, string[]>(
    //(state) => state.photos.addReqs.reqIds
    selector
  );

  if (init === false && processesIds.length !== 0) {
    init = true;
  }

  return {
    doesRender: init,
    processesIds,
  };
};

export default useProcessesManager;
