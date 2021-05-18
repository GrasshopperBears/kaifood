import apiInstance from "../api-instance";

const editRestaurantInfo = async (rid, data) => {
  try {
    const result = await apiInstance.patch(`/restaurant/${rid}`, data);
    return result.data;
  } catch (e) {
    console.error(e);
    return false;
  }
};

export default editRestaurantInfo;
