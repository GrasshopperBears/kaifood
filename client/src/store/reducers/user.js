import { USER_LOGIN, USER_LOGOUT, USER_SET_OWNER, USER_CHECK_LOGIN } from "@actions/user";

const userTrackerInitialState = {
  initialized: false,
  authorized: false,
  isOwner: false,
};

const userTracker = (state = userTrackerInitialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case USER_CHECK_LOGIN:
      return { ...state, initialized: true };
    case USER_LOGIN:
      return { authorized: true, initialized: true, isOwner: payload.isOwner };
    case USER_SET_OWNER:
      return { ...state, isOwner: true };
    case USER_LOGOUT:
      return { ...userTrackerInitialState, initialized: true };
    default:
      return state;
  }
};

export default userTracker;
