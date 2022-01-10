const doesArrsSame = (arr1: any[], arr2: any[]) => {
  for (let i in arr1) {
    if (arr1[i] !== arr2[i]) return false;
  }

  return true;
};

///////////// MOCK USE EFFECT

let prevUseEffDeps: any[];

export const mockUseEffect = (callback: any, arrDeps: any[]) => {
  console.log("MOCK USE EFFECT", prevUseEffDeps);
  if (prevUseEffDeps === undefined) {
    callback();
    prevUseEffDeps = arrDeps;
  } else {
    if (doesArrsSame(prevUseEffDeps, arrDeps) === true) {
    } else {
      callback();
      prevUseEffDeps = arrDeps;
    }
  }
};

export const clearMockUseEffect = () => {
  prevUseEffDeps = undefined;
};

////////// MOCK STATE

export let state = {};
let istate;

// USE IN BEFORE EACH

export const setInitState = (initState: any) => {
  state = initState;
  istate = initState;
};

export const mockSetState = (value: any) => {
  if (typeof value === "function") state = value(state);
  else state = value;
};

// USE IN AFTER EACH
export const clearMockSetState = () => {
  state = istate;
};

///// MOCK BATCH
export const mockBatch = (callback: any) => callback();
