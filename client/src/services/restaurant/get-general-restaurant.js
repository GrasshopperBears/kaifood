import apiInstance from "../api-instance";

const getGeneralRestaurant = async () => {
  try {
    const result = await apiInstance.get("/restaurant/general");
    return result.data;
  } catch (e) {
    console.error(e);
    return false;
  }
};

export default getGeneralRestaurant;
