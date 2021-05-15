import React, { useCallback } from "react";
import { useHistory } from "react-router-dom";
import { Drawer, Divider } from "antd";
import styled from "styled-components";
import { BiRestaurant } from "react-icons/bi";
import { AiOutlineLogout } from "react-icons/ai";
import { MdLocalCafe } from "react-icons/md";

const HeaderDrawer = ({ closeMenu, visible }) => {
  const history = useHistory();
  const goRestaurantInsidePage = useCallback(() => {
    closeMenu();
    history.push("/restaurant/in-campus");
  }, [history]);
  const goRestaurantGeneralPage = useCallback(() => {
    closeMenu();
    history.push("/restaurant/general");
  }, [history]);
  const goRestaurantOutsidePage = useCallback(() => {
    closeMenu();
    history.push("/restaurant/type/outside");
  }, [history]);

  return (
    <DrawerStyled onClose={closeMenu} visible={visible} closable={false} placement="left" width="220">
      <HeaderDrawerEach onClick={goRestaurantInsidePage}>
        교내 식당과 메뉴
        <Divider type="vertical" />
        <BiRestaurant />
      </HeaderDrawerEach>
      <HeaderDrawerEach onClick={goRestaurantGeneralPage}>
        교내 매점 및 카페
        <Divider type="vertical" />
        <MdLocalCafe />
      </HeaderDrawerEach>
      <HeaderDrawerEach onClick={goRestaurantOutsidePage}>
        교외 식당
        <Divider type="vertical" />
        <AiOutlineLogout />
      </HeaderDrawerEach>
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
