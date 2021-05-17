import React, { useEffect, useCallback, useState } from "react";
import { useParams } from "react-router-dom";
import MainTitle from "@components/common/MainTitle";
import RestaurantInfo from "@components/restaurant/RestaurantInfo";
import RestaurantInsideDaily from "@components/restaurant/RestaurantInsideDaily";
import getMenuOfRestaurant from "@services/menu-in-campus/get-menu-of-restaurant";
import styled from "styled-components";

const RestaurantInsideDetailPage = () => {
  const { code } = useParams();
  const [restaurantInfo, setRestaurantInfo] = useState(undefined);
  const [menus, setMenus] = useState([]);

  const initData = useCallback(async () => {
    const result = await getMenuOfRestaurant(code);
    if (!result.length) return;
    setRestaurantInfo(result[0].restaurant);
    setMenus(
      result.reduce((acc, el) => {
        const { date, menuList, _id } = el;
        acc.push({ date, menuList, _id });
        return acc;
      }, [])
    );
  }, [code]);

  useEffect(() => {
    initData();
  }, []);

  return restaurantInfo ? (
    <>
      <MainTitle>{restaurantInfo.name}</MainTitle>
      <RestaurantInfoWrapper>
        <RestaurantInfo time={restaurantInfo.time} address={restaurantInfo.address} phoneNumber={restaurantInfo.phoneNumber} />
      </RestaurantInfoWrapper>
      {menus.map((menu) => (
        <RestaurantInsideDaily date={menu.date} menus={menu.menuList} key={menu._id} />
      ))}
    </>
  ) : (
    <></>
  );
};

const RestaurantInfoWrapper = styled.div`
  padding: 0 ${(props) => props.theme.padding.sidePadding};
  font-size: 0.8rem !important;
`;

export default RestaurantInsideDetailPage;
