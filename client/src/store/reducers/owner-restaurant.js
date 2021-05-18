import { OWNER_RESTAURANT_INIT } from "@actions/owner-restaurant";

const ownerRestaurantInitialState = {
  initialized: false,
  restaurants: [],
};

const ownerRestaurant = (state = ownerRestaurantInitialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case OWNER_RESTAURANT_INIT:
      return { initialized: true, restaurants: payload.restaurants };
    default:
      return state;
  }
};

export default ownerRestaurant;
