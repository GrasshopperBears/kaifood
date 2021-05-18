import apiInstance from "../api-instance";

const getAllReservations = async (code) => {
  try {
    const result = await apiInstance.get(`/reservation/all`);
    return result.data;
  } catch (e) {
    console.log(e);
    return [];
  }
};

export default getAllReservations;
