import React from "react";
import { Tag } from "antd";
import styled from "styled-components";

const ReservationStatus = ({ pending, approved }) => {
  const status = pending ? 0 : approved ? 1 : 2;

  return <TagStyled color={reservationStatus[status].color}>{reservationStatus[status].text}</TagStyled>;
};

const TagStyled = styled(Tag)`
  margin: 0;
`;

const reservationStatus = [
  { text: "대기중", color: "#b1740f" },
  { text: "예약 완료", color: "#1789fc" },
  { text: "예약 거절", color: "#f83f64" },
];

export default ReservationStatus;
