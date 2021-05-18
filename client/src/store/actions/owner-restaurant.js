export const OWNER_RESTAURANT_INIT = "OWNERS_RESTAURANT_INIT";

export const initOwnerRestaurant = (restaurants) => {
  return {
    type: OWNER_RESTAURANT_INIT,
    payload: { restaurants },
  };
};
