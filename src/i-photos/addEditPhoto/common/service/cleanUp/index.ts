import { CleanUp } from "./../types";

export const isNeedReq: CleanUp["isNeedReq"] = () => {
  // get saved date from local storage
  // check if date was saved more then 7 days ago
  return false;
};

export const saveNewCleanUpDate: CleanUp["saveNewCleanUpDate"] = () => {
  // new Date + 7 days
  // save to local storage
};
