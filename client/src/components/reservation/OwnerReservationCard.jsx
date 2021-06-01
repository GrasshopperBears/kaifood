import React from "react";
import { useParams } from "react-router-dom";
import updateReservationApproved from "@services/reservation/update-reservation-approved";
import { Card, Typography, Space, Button, Row, Col, message } from "antd";
import styled from "styled-components";
import moment from "moment";

const OwnerReservationCard = ({ info, onAcceptChange, type }) => {
  const { id } = useParams();
  const { pending, approved, datetime, orders, peopleNumber, _id: reservationId } = info;
  const timeInfo = moment(datetime);

  const acceptReservation = async () => {
    const result = await updateReservationApproved(id, reservationId, true);
    if (!result) message.error("오류가 발생했습니다");
    else onAcceptChange(reservationId, true, type);
  };
  const rejectReservation = async () => {
    const result = await updateReservationApproved(id, reservationId, false);
    if (!result) message.error("오류가 발생했습니다");
    else onAcceptChange(reservationId, false, type);
  };

  return (
    <CardStyled size="small">
      <Space direction="vertical">
        <TypographyStyled>
          시간 : {type === 0 ? timeInfo.format("HH시 mm분") : timeInfo.format("YYYY년 MM월 DD일, HH시 mm분")}
        </TypographyStyled>
        <TypographyStyled>인원 : {peopleNumber}명</TypographyStyled>
        <TypographyStyled>
          주문 정보 :{" "}
          {orders
            .reduce((acc, order) => {
              acc.push(`${order.number}x ${order.menuId.name}`);
              return acc;
            }, [])
            .join(", ")}
        </TypographyStyled>
      </Space>
      <ActionsWrapper>
        <Row>
          <ActionCol span={pending ? 4 : 14} style={{ backgroundColor: "#b1740f", color: "white" }}>
            <div>{pending ? "대기중" : approved ? "예약 완료됨" : "예약 거절됨"}</div>
          </ActionCol>
          {(pending || (!pending && !approved)) && (
            <ActionCol span={10}>
              <ActionButton onClick={acceptReservation} type="primary">
                수락하기
              </ActionButton>
            </ActionCol>
          )}
          {(pending || (!pending && approved)) && (
            <ActionCol span={10}>
              <ActionButton onClick={rejectReservation} type="primary" danger>
                {pending ? "거절하기" : "취소하기"}
              </ActionButton>
            </ActionCol>
          )}
        </Row>
      </ActionsWrapper>
    </CardStyled>
  );
};

const CardStyled = styled(Card)`
  margin: 20px 0 5px;
  .ant-card,
  .ant-card-body {
    padding: 0;
  }
  padding-top: 15px;
`;

const TypographyStyled = styled(Typography)`
  margin: 0 15px;
`;

const ActionsWrapper = styled.div``;

const ActionCol = styled(Col)`
  text-align: center;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
  button {
    height: 100%;
    padding: 5px 0;
  }
`;

const ActionButton = styled(Button)`
  width: 100%;
  border: transparent;
`;

export default OwnerReservationCard;
