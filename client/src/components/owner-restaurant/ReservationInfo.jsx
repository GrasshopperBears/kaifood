import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import moment from "moment";
import OwnerReservationCollection from "@components/reservation/OwnerReservationCollection";
import getOwnerReservations from "@services/reservation/get-owner-reservations";
import { Empty, Divider } from "antd";
import { GiSadCrab } from "react-icons/gi";

const ReservationInfo = () => {
  const { id } = useParams();
  const [todayReservations, setTodayReservations] = useState([]);
  const [otherDayReservations, setOtherDayReservations] = useState([]);
  // const [oldReservations, setOldReservations] = useState([]);

  const fetchReservations = async () => {
    const result = await getOwnerReservations(id);
    setTodayReservations(result.filter((reservation) => moment(reservation.datetime).isSame(moment(), "day")));
    setOtherDayReservations(result.filter((reservation) => moment(reservation.datetime).isAfter(moment(), "days")));
    // setOldReservations(result.filter((reservation) => moment().diff(moment(reservation.datetime), "days") > 0));
  };

  const onAcceptChange = (id, approved, type) => {
    switch (type) {
      case 0:
        setTodayReservations(
          todayReservations.reduce((acc, reservation) => {
            if (reservation._id !== id) acc.push(reservation);
            else acc.push({ ...reservation, approved, pending: false });
            return acc;
          }, [])
        );
        break;
      case 1:
        setOtherDayReservations(
          otherDayReservations.reduce((acc, reservation) => {
            if (reservation._id !== id) acc.push(reservation);
            else acc.push({ ...reservation, approved, pending: false });
            return acc;
          }, [])
        );
        break;
      default:
        return;
    }
  };

  useEffect(() => {
    fetchReservations();
  }, [id]);

  return (
    <>
      {!!todayReservations.length && (
        <>
          <OwnerReservationCollection title="오늘" reservations={todayReservations} onAcceptChange={onAcceptChange} type={0} />
          <Divider style={{ border: "solid 1px #aaaaaa" }} />
        </>
      )}
      {!!otherDayReservations.length && (
        <OwnerReservationCollection title="이후" reservations={otherDayReservations} onAcceptChange={onAcceptChange} type={1} />
      )}
      {otherDayReservations.length + todayReservations.length === 0 && (
        <Empty image={<GiSadCrab size="80" />} description="예약 내역이 없습니다" style={{ marginTop: "100px" }} />
      )}
    </>
  );
};

export default ReservationInfo;
