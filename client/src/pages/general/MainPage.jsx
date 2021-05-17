import React, { useState, useEffect } from "react";
import getTodayMenu from "@services/menu-in-campus/get-today-menu";
import MainMenuCard from "@components/user-main/MainMenuCard";
import MainTitle from "@components/common/MainTitle";

const MainPage = () => {
  const [currentTime] = useState(new Date().getHours());
  const [mealType] = useState(currentTime <= 9 ? 0 : currentTime < 14 ? 1 : 2);
  const [menus, setMenus] = useState([]);

  const getMenu = async () => {
    const data = await getTodayMenu();
    setMenus(data);
  };

  useEffect(() => {
    getMenu();
  }, []);

  return (
    <>
      <MainTitle>오늘의 {mealName[mealType]}상</MainTitle>
      {menus.map((menu) => (
        <MainMenuCard menus={menu.menuList[mealType].join(" / ")} info={menu.restaurant} key={menu._id} />
      ))}
    </>
  );
};

const mealName = ["아침", "점심", "저녁"];

export default MainPage;
