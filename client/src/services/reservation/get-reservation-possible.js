import apiInstance from "../api-instance";

const getReservationPossible = async (rid, datetime) => {
  try {
    const result = await apiInstance.get(`/reservation/check/${rid}/${datetime}`);
    return result.data;
  } catch (e) {
    return false;
  }
};

export default getReservationPossible;
