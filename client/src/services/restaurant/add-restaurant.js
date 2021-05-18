import apiInstance from "../api-instance";

const addRestaurant = async (data) => {
  try {
    const result = await apiInstance.post("/restaurant", data);
    return result.data;
  } catch (e) {
    console.error(e);
    return false;
  }
};

export default addRestaurant;
