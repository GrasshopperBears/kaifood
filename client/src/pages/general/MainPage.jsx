import React, { useState, useEffect } from "react";
import getTodayMenu from "@services/menu-in-campus/get-today-menu";
import MainMenuCard from "@components/user-main/MainMenuCard";
import MainTitle from "@components/common/MainTitle";
import { message } from "antd";

const MainPage = () => {
  const [currentTime] = useState(new Date().getHours());
  const [mealType] = useState(currentTime <= 9 ? 0 : currentTime < 14 ? 1 : 2);
  const [menus, setMenus] = useState([]);

  const getMenu = async () => {
    try {
      const data = await getTodayMenu();
      setMenus(data);
    } catch (e) {
      message.error("목록 로드 중 오류가 발생했습니다");
    }
  };

  useEffect(() => {
    getMenu();
  }, []);

  return (
    <>
      <MainTitle>오늘의 {mealName[mealType]}상</MainTitle>
      {menus.map((menu) => (
        <MainMenuCard
          menus={menu.menuList[mealType].length ? menu.menuList[mealType].join(" / ") : "메뉴 정보가 없어요..."}
          info={menu.restaurant}
          key={menu._id}
        />
      ))}
    </>
  );
};

const mealName = ["아침", "점심", "저녁"];

export default MainPage;
