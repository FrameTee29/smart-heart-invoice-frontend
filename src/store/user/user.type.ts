import { Action, Computed } from "easy-peasy";

export interface UserModelState {
  isAdmin: boolean;
}

export interface UserModel extends UserModelState {
  isCustomer: Computed<this, boolean>;
  setIsAdmin: Action<this, boolean>;
}
