export const OWNER_RESTAURANT_INIT = "OWNERS_RESTAURANT_INIT";
export const ADD_OWNER_RESTAURANT = "ADD_OWNER_RESTAURANT";
export const CLEAR_OWNER_RESTAURANT = "CLEAR_OWNER_RESTAURANT";

export const initOwnerRestaurant = (restaurants) => {
  return {
    type: OWNER_RESTAURANT_INIT,
    payload: { restaurants },
  };
};

export const addOwnerRestaurant = (restaurant) => {
  return {
    type: ADD_OWNER_RESTAURANT,
    payload: { restaurant },
  };
};

export const clearOwnerRestaurant = () => {
  return {
    type: CLEAR_OWNER_RESTAURANT,
  };
};
