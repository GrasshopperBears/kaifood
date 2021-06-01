import React from "react";
import OwnerReservationCard from "@components/reservation/OwnerReservationCard";
import { Typography } from "antd";

const { Title } = Typography;

const OwnerReservationCollection = ({ title, reservations, onAcceptChange, type }) => {
  return (
    <>
      <Title level={4}>{title}</Title>
      {reservations.map((reservation) => (
        <OwnerReservationCard info={reservation} key={reservation._id} onAcceptChange={onAcceptChange} type={type} />
      ))}
    </>
  );
};

export default OwnerReservationCollection;
