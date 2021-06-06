import React, { useEffect, useCallback, useState } from "react";
import { useParams } from "react-router-dom";
import MainTitle from "@components/common/MainTitle";
import RestaurantInfo from "@components/restaurant/RestaurantInfo";
import RestaurantInsideDaily from "@components/restaurant/RestaurantInsideDaily";
import getMenuOfRestaurant from "@services/menu-in-campus/get-menu-of-restaurant";
import { Spin, Empty } from "antd";
import styled from "styled-components";
import { GiSadCrab } from "react-icons/gi";

const RestaurantInsideDetailPage = () => {
  const { code } = useParams();
  const [pending, setPending] = useState(true);
  const [restaurantInfo, setRestaurantInfo] = useState(undefined);
  const [menus, setMenus] = useState([]);

  const initData = useCallback(async () => {
    setPending(true);
    const result = await getMenuOfRestaurant(code);
    if (result.length) {
      setRestaurantInfo(result[0].restaurant);
      setMenus(
        result.reduce((acc, el) => {
          const { date, menuList, _id } = el;
          acc.push({ date, menuList, _id });
          return acc;
        }, [])
      );
    }
    setPending(false);
  }, [code]);

  useEffect(() => {
    initData();
  }, [initData]);

  return pending ? (
    <Spin />
  ) : restaurantInfo ? (
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
    <Empty image={<GiSadCrab size="80" />} description="메뉴 정보가 없습니다" style={{ marginTop: "100px" }} />
  );
};

const RestaurantInfoWrapper = styled.div`
  font-size: 0.8rem !important;
`;

export default RestaurantInsideDetailPage;
