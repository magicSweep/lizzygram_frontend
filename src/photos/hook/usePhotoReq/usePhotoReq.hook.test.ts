import { useSelfKill_ } from "./hook";
import { SelfKillingCheckerProps } from "./helper";
import { mockUseEffect, clearMockUseEffect } from "../../../utils/mock";

describe("useSelfKill_ - this func collect info and in useEffect check if need to destroy current request", () => {
  const useDispatch = jest.fn(() => "dispatch");
  const useRef = jest.fn((obj: any) => {
    if (obj === undefined) return { current: {} };
    return { current: obj };
  });
  const useEffect = jest.fn(mockUseEffect);

  const selfKilling = jest.fn();

  const selfKilling_ = jest.fn(() => selfKilling);

  const selfKillingChecker_ = jest.fn();
  selfKillingChecker_.mockReturnValueOnce(false);

  const removeRequest = jest.fn();

  const state: SelfKillingCheckerProps["state"] = {
    showForm: false,
    formWasClosed: false,
    isFormSubmited: false,
    //end: false,
    isEndReq: false,
  };

  afterEach(() => {
    jest.clearAllMocks();
    clearMockUseEffect();
  });

  test("If selfKillingChecker_ return false - we do not need to call selfKilling", () => {
    const useSelfKill = useSelfKill_(
      useDispatch as any,
      useRef as any,
      useEffect as any,
      selfKilling_,
      selfKillingChecker_
    );

    const res = useSelfKill({
      state,
      removeRequest,
    });

    expect(useDispatch).toHaveBeenCalledTimes(1);
    expect(useRef).toHaveBeenCalledTimes(1);
    expect(useEffect).toHaveBeenCalledTimes(1);

    expect(selfKilling_).toHaveBeenCalledTimes(1);
    expect(selfKilling).toHaveBeenCalledTimes(0);
    expect(selfKillingChecker_).toHaveBeenCalledTimes(1);

    expect((res as any).mainRef).toEqual({
      current: { isNeedSelfKilling: false, isSelfKilled: false, timerId: null },
    });
  });

  test("If selfKillingChecker_ return true - we call selfKilling", () => {
    selfKillingChecker_.mockReturnValueOnce(true);

    const useSelfKill = useSelfKill_(
      useDispatch as any,
      useRef as any,
      useEffect as any,
      selfKilling_,
      selfKillingChecker_
    );

    const res = useSelfKill({
      state,
      removeRequest,
    });

    //expect(res).toEqual("hello");

    expect(useDispatch).toHaveBeenCalledTimes(1);
    expect(useRef).toHaveBeenCalledTimes(1);
    expect(useEffect).toHaveBeenCalledTimes(1);

    expect(selfKilling_).toHaveBeenCalledTimes(1);
    expect(selfKilling).toHaveBeenCalledTimes(1);
    expect(selfKillingChecker_).toHaveBeenCalledTimes(1);

    expect((res as any).mainRef).toEqual({
      current: { isNeedSelfKilling: false, isSelfKilled: false, timerId: null },
    });
  });
});
