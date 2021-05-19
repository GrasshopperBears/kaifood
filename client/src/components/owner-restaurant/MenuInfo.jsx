import React, { useState, useEffect } from "react";
import AddMenuModal from "./AddMenuModal";
import RestaurantOutCampusMenu from "@components/common/RestaurantOutCampusMenu";
import getRestaurantMenus from "@services/menu-out-campus/get-restaurant-menus";
import { Button } from "antd";
import styled from "styled-components";

const MenuInfo = ({ info: { _id: rid } }) => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [menus, setMenus] = useState([]);

  const showModal = () => {
    setShowAddModal(true);
  };
  const hideModal = () => {
    setShowAddModal(false);
  };

  const initMenus = async () => {
    const result = await getRestaurantMenus(rid);
    setMenus(result);
  };

  const addMenuHandler = (newMenu) => {
    setMenus([...menus, newMenu]);
  };

  useEffect(() => {
    initMenus();
  }, []);

  return (
    <>
      <ButtonStyled onClick={showModal} shape="round">
        + 메뉴 추가하기
      </ButtonStyled>
      {menus.map((el) => (
        <RestaurantOutCampusMenu key={el._id} info={el} />
      ))}
      <AddMenuModal visible={showAddModal} hideModal={hideModal} rid={rid} addState={addMenuHandler} />
    </>
  );
};

const ButtonStyled = styled(Button)`
  width: 100%;
  height: 40px;
  margin-bottom: 20px;
`;

export default MenuInfo;
