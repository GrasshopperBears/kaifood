import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import MainTitle from "@components/common/MainTitle";
import RestaurantInfo from "@components/restaurant/RestaurantInfo";
import { Spin } from "antd";
import styled from "styled-components";

const RestaurantOutsideDetailPage = () => {
  const { id } = useParams();
  const [restaurantInfo, setRestaurantInfo] = useState(undefined);
  const [menus, setMenus] = useState([]);

  useEffect(() => {}, [id]);

  return restaurantInfo ? (
    <>
      <MainTitle>{restaurantInfo.name}</MainTitle>
      <RestaurantInfoWrapper>
        <RestaurantInfo time={restaurantInfo.time} address={restaurantInfo.address} phoneNumber={restaurantInfo.phoneNumber} />
      </RestaurantInfoWrapper>
    </>
  ) : (
    <Spin />
  );
};

const RestaurantInfoWrapper = styled.div`
  font-size: 0.8rem !important;
`;

export default RestaurantOutsideDetailPage;
