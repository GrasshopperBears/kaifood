import React, { useState, useEffect } from "react";
import getGeneralRestaurant from "@services/restaurant/get-general-restaurant";
import RestaurantCard from "@components/restaurant/RestaurantCard";
import MainTitle from "@components/common/MainTitle";
import { Tabs, message } from "antd";
import styled from "styled-components";

const { TabPane } = Tabs;

const RestaurantGeneralPage = () => {
  const [restaurants, setRestaurants] = useState({ store: [], cafe: [] });
  useEffect(() => {
    initRestaurants();
  }, []);

  const initRestaurants = async () => {
    try {
      const result = await getGeneralRestaurant();
      const store = result.filter((el) => el.restaurantType === "store-in");
      const cafe = result.filter((el) => el.restaurantType === "cafe-in");
      setRestaurants({ store, cafe });
    } catch (e) {
      message.error("목록 로드 중 오류가 발생했습니다");
    }
  };

  return (
    <>
      <MainTitle>교내 매점 및 카페</MainTitle>
      <TabsStyled>
        <TabPane tab="매점" key="1">
          {restaurants.store.map((el) => (
            <RestaurantCard info={el} key={el._id} />
          ))}
        </TabPane>
        <TabPane tab="카페/패스트푸드" key="2">
          {restaurants.cafe.map((el) => (
            <RestaurantCard info={el} key={el._id} />
          ))}
        </TabPane>
      </TabsStyled>
    </>
  );
};

const TabsStyled = styled(Tabs)`
  .ant-tabs-nav-wrap {
    margin: 0 ${(props) => props.theme.padding.sidePadding};
  }
`;

export default RestaurantGeneralPage;
