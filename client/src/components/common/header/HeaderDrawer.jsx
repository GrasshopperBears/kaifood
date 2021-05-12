import React, { useCallback } from "react";
import { useHistory } from "react-router-dom";
import { Drawer } from "antd";
import styled from "styled-components";

const HeaderDrawer = ({ closeMenu, visible }) => {
  const history = useHistory();
  const goRestaurantInsidePage = useCallback(() => {
    history.push("/restaurant/type/inside");
  }, [history]);
  const goRestaurantGeneralPage = useCallback(() => {
    history.push("/restaurant/type/general");
  }, [history]);
  const goRestaurantOutsidePage = useCallback(() => {
    history.push("/restaurant/type/outside");
  }, [history]);

  return (
    <DrawerStyled onClose={closeMenu} visible={visible} closable={false} placement="left" width="220">
      <HeaderDrawerEach onClick={goRestaurantInsidePage}>교내 식당과 메뉴</HeaderDrawerEach>
      <HeaderDrawerEach onClick={goRestaurantGeneralPage}>교내 가게</HeaderDrawerEach>
      <HeaderDrawerEach onClick={goRestaurantOutsidePage}>어은동 식당</HeaderDrawerEach>
    </DrawerStyled>
  );
};

const DrawerStyled = styled(Drawer)``;

const HeaderDrawerEach = styled.div`
  padding: 12px 0;
  text-align: right;
  :hover {
    cursor: pointer;
  }
`;

export default HeaderDrawer;
