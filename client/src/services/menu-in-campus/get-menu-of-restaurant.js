import apiInstance from "../api-instance";

const getMenuOfRestaurant = async (code) => {
  try {
    const result = await apiInstance.get(`/menu-in-campus/${code}`);
    return result.data;
  } catch (e) {
    console.log(e);
    return [];
  }
};

export default getMenuOfRestaurant;
