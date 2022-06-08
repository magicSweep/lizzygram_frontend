import { SelfKillingCheckerProps, selfKillingChecker_ } from "./helper";

// remove request if:
// - it successfully done
// - it has error and form already closed
// - form closed without submit
// - form closed and we get error
describe("selfKillingChecker - does we need to kill current request", () => {
  const state: SelfKillingCheckerProps["state"] = {
    showForm: false,
    formWasClosed: false,
    isFormSubmited: false,
    //end: false,
    isEndReq: false,
  };

  const possibilities = [
    { count: 0, isSelfKilled: true, state, expected: false },
    { count: 1, isSelfKilled: false, state, expected: false },
    // form was closed without submit
    {
      count: 2,
      isSelfKilled: false,
      state: { ...state, formWasClosed: true },
      expected: true,
    },
    {
      count: 3,
      isSelfKilled: true,
      state: { ...state, formWasClosed: true, isFormSubmited: true },
      expected: false,
    },
    // request ended
    {
      count: 4,
      isSelfKilled: true,
      state: { ...state, formWasClosed: true, isEndReq: true },
      expected: false,
    },
  ];

  test.each(possibilities)(".$count", ({ isSelfKilled, state, expected }) => {
    expect(selfKillingChecker_({ isSelfKilled, state })).toBe(expected);
  });
});
