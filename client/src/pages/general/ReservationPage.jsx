import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Empty } from "antd";
import MainTitle from "@components/common/MainTitle";
import UserReservationCard from "@components/reservation/UserReservationCard";
import getAllReservations from "@services/reservation/get-all-reservations";
import { GiSadCrab } from "react-icons/gi";

const ReservationPage = () => {
  const [reservations, setReservations] = useState([]);
  const { initialized } = useSelector((state) => state.userTracker);
  const initReservations = async () => {
    const result = await getAllReservations();
    setReservations(result);
  };

  useEffect(() => {
    if (initialized) initReservations();
  }, [initialized]);

  return (
    <>
      <MainTitle>예약 내역</MainTitle>
      {reservations.length ? (
        reservations.map((el) => <UserReservationCard info={el} key={el._id} />)
      ) : (
        <Empty image={<GiSadCrab size="80" />} description="예약 내역이 없습니다" style={{ marginTop: "100px" }} />
      )}
    </>
  );
};

export default ReservationPage;
