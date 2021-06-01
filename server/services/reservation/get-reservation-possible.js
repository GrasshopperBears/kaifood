const getReservationPossible = async (req, res) => {
  res.json(req.body.reservationValidity);
};

export default getReservationPossible;
