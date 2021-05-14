import React, { useState, useEffect } from "react";
import getTodayMenu from "@services/menu/get-today-menu";
import MainMenuCard from "@components/user-main/MainMenuCard";
import { Typography } from "antd";
import styled from "styled-components";

const { Title } = Typography;

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
      <MainTitle level={2}>오늘의 {mealName[mealType]}상</MainTitle>
      {menus.map((menu) => (
        <MainMenuCard menus={menu.menuList[mealType].join(" / ")} info={menu.restaurant} key={menu._id} />
      ))}
    </>
  );
};

const MainTitle = styled(Title)`
  margin: 15px 25px;
`;

const mealName = ["아침", "점심", "저녁"];

export default MainPage;
