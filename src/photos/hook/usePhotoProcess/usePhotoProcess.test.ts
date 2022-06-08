import { mockUseEffect, clearMockUseEffect } from "../../../utils/mock";
import { usePhotoProcess_, PhotoProcessState } from ".";

test.skip("", () => {
  const stackDepth = (msg: string = "Stack size") => {
    console.log(`${msg} | ${new Error().stack.split("\n").length}`);
  };

  const func = () => {
    //const v = 123;

    return "hello";
  };

  const main = () => {
    //const v = 123;

    for (let i = 0; i < 20; i++) {
      //
      func();
    }

    return "hello";
  };

  const res = main();

  expect(res).toEqual(18);
});

describe("usePhotoReq - get share data and methods and watch for self destroy", () => {
  const useEffect = jest.fn(mockUseEffect);
  const useAuth = jest.fn(() => ({ userUid: "123qwe" }));
  const setState = jest.fn();
  const useState = jest.fn((state) => [state, setState]);
  const useSelfKill = jest.fn();
  const removeRequest = jest.fn();

  const state: PhotoProcessState = {
    showForm: false,
    formWasClosed: false,
    isFormSubmited: false,
    uploadLoading: false,
    //end: false,
    isEndReq: false,
  };

  afterEach(() => {
    jest.clearAllMocks();
    clearMockUseEffect();
  });

  test("", () => {
    // It get userUid from useAuth
    // It init state - PhotoReqState
    // In useEffect it opens form
    // It calls useSelfKill

    const usePhotoProcess = usePhotoProcess_(
      useAuth as any,
      useState as any,
      useEffect as any,
      useSelfKill
    );

    const res = usePhotoProcess({
      removeRequest,
    });

    //expect(res).toEqual("hello");
    expect(useEffect).toHaveBeenCalledTimes(1);
    expect(useAuth).toHaveBeenCalledTimes(1);
    expect(useState).toHaveBeenCalledTimes(1);
    expect(setState).toHaveBeenCalledTimes(1);
    expect(useSelfKill).toHaveBeenCalledTimes(1);
    expect(useSelfKill).toHaveBeenNthCalledWith(1, {
      removeRequest,
      state: {
        formWasClosed: false,
        isEndReq: false,
        isFormSubmited: false,
        showForm: false,
        uploadLoading: false,
      },
    });
  });
});
