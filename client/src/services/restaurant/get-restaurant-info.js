import apiInstance from "../api-instance";

const getRestaurantInfo = async (rid) => {
  try {
    const result = await apiInstance.get(`/restaurant/${rid}`);
    return result.data;
  } catch (e) {
    console.error(e);
    return false;
  }
};

export default getRestaurantInfo;
