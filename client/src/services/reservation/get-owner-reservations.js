"/:id/reservations";
import apiInstance from "../api-instance";

const getOwnerReservations = async (rid) => {
  try {
    const result = await apiInstance.get(`/reservation/${rid}/reservations`);
    return result.data;
  } catch (e) {
    console.log(e);
    return [];
  }
};

export default getOwnerReservations;
