import { OWNER_RESTAURANT_INIT, ADD_OWNER_RESTAURANT, CLEAR_OWNER_RESTAURANT } from "@actions/owner-restaurant";

const ownerRestaurantInitialState = {
  initialized: false,
  restaurants: [],
};

const ownerRestaurant = (state = ownerRestaurantInitialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case OWNER_RESTAURANT_INIT:
      return { initialized: true, restaurants: payload.restaurants };
    case ADD_OWNER_RESTAURANT:
      return { ...state, restaurants: [...state.restaurants, payload.restaurant] };
    case CLEAR_OWNER_RESTAURANT:
      return ownerRestaurantInitialState;
    default:
      return state;
  }
};

export default ownerRestaurant;
