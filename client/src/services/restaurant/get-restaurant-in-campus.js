import apiInstance from "../api-instance";

const getRestaurantInCampus = async () => {
  try {
    const result = await apiInstance.get("/restaurant/in-campus");
    return result.data;
  } catch (e) {
    console.error(e);
    return false;
  }
};

export default getRestaurantInCampus;
