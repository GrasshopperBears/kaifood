import apiInstance from "../api-instance";

const requestReservation = async (rid, datetime, info) => {
  try {
    const result = await apiInstance.post(`/reservation/${rid}/${datetime}`, info);
    return result.data;
  } catch (e) {
    return false;
  }
};

export default requestReservation;
