import { USER_LOGIN, USER_LOGOUT, USER_CHECK_LOGIN } from "@actions/user";

const counterInitialState = {
  initialized: false,
  authorized: false,
};

const userTracker = (state = counterInitialState, action) => {
  switch (action.type) {
    case USER_CHECK_LOGIN:
      return { ...state, initialized: true };
    case USER_LOGIN:
      return { authorized: true, initialized: true };
    case USER_LOGOUT:
      return { authorized: false, initialized: true };
    default:
      return state;
  }
};

export default userTracker;
