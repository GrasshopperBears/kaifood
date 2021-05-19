import apiInstance from "../api-instance";

const getRestaurantMenus = async (rid) => {
  try {
    const result = await apiInstance.get(`/menu-out-campus/${rid}`);
    return result.data;
  } catch (e) {
    console.error(e);
    return [];
  }
};

export default getRestaurantMenus;
