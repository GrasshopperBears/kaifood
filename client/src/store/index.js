import { combineReducers } from "redux";
import userTracker from "@reducers/user";
import ownerRestaurant from "@reducers/owner-restaurant";

const extra = (state = { value: "extra_reducer" }, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

const reducers = combineReducers({
  userTracker,
  ownerRestaurant,
  extra,
});

export default reducers;
