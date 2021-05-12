import { USER_LOGIN, USER_LOGOUT } from "@actions/user";

const counterInitialState = {
  authorized: false,
};

const userTracker = (state = counterInitialState, action) => {
  switch (action.type) {
    case USER_LOGIN:
      return { authorized: true };
    case USER_LOGOUT:
      return { authorized: false };
    default:
      return state;
  }
};

export default userTracker;
