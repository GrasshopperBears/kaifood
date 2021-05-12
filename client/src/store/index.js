import { combineReducers } from "redux";
import userTracker from "@reducers/user";

const extra = (state = { value: "this_is_extra_reducer" }, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

const reducers = combineReducers({
  userTracker,
  extra,
});

export default reducers;
