import { onAuthStateChanged } from ".";

const dispatch = jest.fn();

const firestoreUser = {
  displayName: "Yallopukka",
  email: "ya@frog.pog",
  uid: "uid",
};

describe("useAuthSubscribe", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("onAuthStateChanged", () => {
    test("If user null - we dispatch null user", () => {
      const change = onAuthStateChanged(dispatch);

      change(null);

      expect(dispatch).toHaveBeenCalledTimes(1);

      expect(dispatch).toHaveBeenNthCalledWith(1, {
        type: "auth/auth",
        payload: null,
      });
    });

    test("If we have user - we dispatch user", () => {
      const change = onAuthStateChanged(dispatch);

      change(firestoreUser);

      expect(dispatch).toHaveBeenCalledTimes(1);

      expect(dispatch).toHaveBeenNthCalledWith(1, {
        type: "auth/auth",
        payload: {
          name: "Yallopukka",
          email: "ya@frog.pog",
          uid: "uid",
          isEditor: undefined,
        },
      });
    });
  });
});
