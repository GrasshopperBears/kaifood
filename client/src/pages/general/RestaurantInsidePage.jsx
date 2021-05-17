import React, { useState, useEffect } from "react";
import getRestaurantInCampus from "@services/restaurant/get-restaurant-in-campus";
import RestaurantCard from "@components/restaurant/RestaurantCard";
import MainTitle from "@components/common/MainTitle";
import { message } from "antd";

const RestaurantInsidePage = () => {
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    initRestaurants();
  }, []);

  const initRestaurants = async () => {
    try {
      const result = await getRestaurantInCampus();
      setRestaurants(result);
    } catch (e) {
      message.error("목록 로드 중 오류가 발생했습니다");
    }
  };

  return (
    <>
      <MainTitle>교내 식당</MainTitle>
      {restaurants.map((el) => (
        <RestaurantCard info={el} key={el._id} url={el.code ? `/restaurant/in-campus/${el.code}` : undefined} />
      ))}
    </>
  );
};

export default RestaurantInsidePage;
