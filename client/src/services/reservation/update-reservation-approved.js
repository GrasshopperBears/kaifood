import apiInstance from "../api-instance";

const updateReservationApproved = async (restaurantId, reservationId, approve) => {
  try {
    const result = await apiInstance.patch(`/reservation/${restaurantId}/approved`, { approve, reservationId });
    return result.status === 200;
  } catch (e) {
    return false;
  }
};

export default updateReservationApproved;
