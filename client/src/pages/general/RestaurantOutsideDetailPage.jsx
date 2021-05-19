import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import MainTitle from "@components/common/MainTitle";
import RestaurantInfo from "@components/restaurant/RestaurantInfo";
import RestaurantOutCampusMenu from "@components/common/RestaurantOutCampusMenu";
import getRestaurantInfo from "@services/restaurant/get-restaurant-info";
import getRestaurantMenus from "@services/menu-out-campus/get-restaurant-menus";
import { Spin, Divider } from "antd";
import styled from "styled-components";

const RestaurantOutsideDetailPage = () => {
  const { id } = useParams();
  const [restaurantInfo, setRestaurantInfo] = useState(undefined);
  const [menus, setMenus] = useState([]);

  const initRestaurant = async () => {
    const result = await getRestaurantInfo(id);
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
        <RestaurantInfo time={restaurantInfo.time} address={restaurantInfo.address} phoneNumber={restaurantInfo.phoneNumber} />
      </RestaurantInfoWrapper>
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

export default RestaurantOutsideDetailPage;
