import React from "react";
import { useHistory } from "react-router-dom";
import ReservationStatus from "./ReservationStatus";
import { Card, Typography, Space, Button } from "antd";
import styled from "styled-components";
import moment from "moment";
import { MdRestaurant } from "react-icons/md";

const UserReservationCard = ({ info }) => {
  const { pending, approved, restaurant, datetime, orders, peopleNumber } = info;
  const timeInfo = moment(datetime);
  const history = useHistory();

  const goRestaurantPage = () => {
    history.push(`/restaurant/outside/${restaurant._id}`);
  };

  return (
    <CardStyled title={timeInfo.format("YYYY-MM-DD")} extra={<ReservationStatus pending={pending} approved={approved} />} size="small">
      <Space direction="vertical">
        <RestaurantWrapper>
          <Typography>식당 : {restaurant.name}</Typography>
          <Button onClick={goRestaurantPage} size="small" icon={<MdRestaurant />}>
            식당 확인하기
          </Button>
        </RestaurantWrapper>
        <Typography>시간 : {timeInfo.format("HH시 mm분")}</Typography>
        <Typography>인원 : {peopleNumber}명</Typography>
        <Typography>
          주문 정보 :{" "}
          {orders
            .reduce((acc, order) => {
              acc.push(`${order.number}x ${order.menuId.name}`);
              return acc;
            }, [])
            .join(", ")}
        </Typography>
      </Space>
    </CardStyled>
  );
};

const CardStyled = styled(Card)`
  margin: 20px 0 5px;
  padding: 5px 7px;
`;

const RestaurantWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  button {
    margin-left: 15px;
  }
`;

export default UserReservationCard;
