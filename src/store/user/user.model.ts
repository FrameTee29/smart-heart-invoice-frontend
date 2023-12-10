import { action, computed } from "easy-peasy";
import { UserModel, UserModelState } from "./user.type";

const initialState: UserModelState = {
  isAdmin: false,
};

const createUserStore = (): UserModel => ({
  ...initialState,
  isCustomer: computed((state) => !state.isAdmin),
  setIsAdmin: action((state, payload) => {
    state.isAdmin = payload;
  }),
});

export default createUserStore;
