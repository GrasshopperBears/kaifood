import apiInstance from "../api-instance";

const addMenu = async (formData) => {
  try {
    const headers = { "Content-Type": "multipart/form-data" };
    const result = await apiInstance.post("/menu-out-campus", formData, { headers });
    return result.data;
  } catch (e) {
    console.error(e);
    return false;
  }
};

export default addMenu;
