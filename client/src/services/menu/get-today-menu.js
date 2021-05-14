import apiInstance from "../api-instance";

const getTodayMenu = async () => {
  try {
    const result = await apiInstance.get("/menu-in-campus/today");
    return result.data;
  } catch (e) {
    console.log(e);
    return [];
  }
};

export default getTodayMenu;
