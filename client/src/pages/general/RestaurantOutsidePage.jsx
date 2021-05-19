import React, { useEffect, useState } from "react";
import MainTitle from "@components/common/MainTitle";
import RestaurantCard from "@components/restaurant/RestaurantCard";
import getRestaurantOutCampus from "@services/restaurant/get-restaurant-out-campus";

const RestaurantOutsidePage = () => {
  const [restaurants, setRestaurants] = useState([]);

  const initList = async () => {
    const result = await getRestaurantOutCampus();
    setRestaurants(result);
  };

  useEffect(() => {
    initList();
  }, []);

  return (
    <>
      <MainTitle>교외 식당</MainTitle>
      {restaurants.map((el) => (
        <RestaurantCard key={el._id} info={el} url={`/restaurant/outside/${el._id}`} />
      ))}
    </>
  );
};

export default RestaurantOutsidePage;
