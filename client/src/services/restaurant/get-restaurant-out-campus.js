import apiInstance from "../api-instance";

const getRestaurantOutCampus = async () => {
  try {
    const result = await apiInstance.get("/restaurant/out-campus");
    return result.data;
  } catch (e) {
    console.error(e);
    return false;
  }
};

export default getRestaurantOutCampus;
