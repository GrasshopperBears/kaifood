import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import MainTitle from "@components/common/MainTitle";
import RestaurantInfo from "@components/restaurant/RestaurantInfo";
import RestaurantOutCampusMenu from "@components/common/RestaurantOutCampusMenu";
import getRestaurantInfo from "@services/restaurant/get-restaurant-info";
import getRestaurantMenus from "@services/menu-out-campus/get-restaurant-menus";
import workingTimeString from "@utils/working-time-string";
import { Spin, Divider, Button, message } from "antd";
import styled from "styled-components";

const RestaurantOutsideDetailPage = () => {
  const { id } = useParams();
  const history = useHistory();
  const [restaurantInfo, setRestaurantInfo] = useState(undefined);
  const [menus, setMenus] = useState([]);
  const { initialized, authorized } = useSelector((state) => state.userTracker);

  const startRervation = async () => {
    if (!initialized || !authorized) return message.warn("로그인 후 진행해주세요");
    history.push({ pathname: `/restaurant/outside/${id}/reservation`, state: { restaurantInfo, menus } });
  };

  const initRestaurant = async () => {
    const result = await getRestaurantInfo(id);
    if (!result) history.push("/restaurant/out-campus");
    setRestaurantInfo(result);
    const menuResult = await getRestaurantMenus(id);
    setMenus(menuResult);
  };

  useEffect(() => {
    initRestaurant();
  }, [id]);

  return restaurantInfo ? (
    <>
      <MainTitle>{restaurantInfo.name}</MainTitle>
      <RestaurantInfoWrapper>
        <RestaurantInfo
          time={workingTimeString(restaurantInfo.outCampusTime)}
          address={restaurantInfo.address}
          phoneNumber={restaurantInfo.phoneNumber}
        />
      </RestaurantInfoWrapper>
      <Description>{restaurantInfo.description}</Description>
      {menus.length > 0 && restaurantInfo.provideReservation && (
        <ReservationButton size="large" onClick={startRervation}>
          예약하기
        </ReservationButton>
      )}
      {menus.length > 0 ? <Divider orientation="left">메뉴 목록</Divider> : <Divider orientation="center">메뉴 없음</Divider>}
      {menus.map((el) => (
        <RestaurantOutCampusMenu key={el._id} info={el} />
      ))}
    </>
  ) : (
    <Spin />
  );
};

const RestaurantInfoWrapper = styled.div`
  font-size: 0.8rem !important;
  padding: 10px 20px;
  border: 1px solid rgba(50, 50, 50, 0.2);
  border-radius: 6px;
`;

const Description = styled.div`
  margin: 15px 0;
  color: #777777;
  font-size: 0.8rem;
`;

const ReservationButton = styled(Button)`
  width: 100%;
`;

export default RestaurantOutsideDetailPage;
