import React, { useCallback } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { Drawer, Divider, Spin } from "antd";
import styled from "styled-components";
import { BiRestaurant } from "react-icons/bi";
import { AiOutlineLogout } from "react-icons/ai";
import { MdLocalCafe, MdAddCircle } from "react-icons/md";

const HeaderDrawer = ({ closeMenu, visible }) => {
  const { pathname } = useLocation();
  const { initialized, restaurants } = useSelector((state) => state.ownerRestaurant);
  const history = useHistory();

  const clickMyRestaurantHandler = useCallback(
    (id) => {
      closeMenu();
      history.push(`/owner/detail/${id}`);
    },
    [history]
  );
  const goAddRestaurantPage = useCallback(() => {
    closeMenu();
    history.push("/owner/add");
  }, [history]);
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
      {pathname.startsWith("/owner") ? (
        <>
          {initialized ? (
            restaurants.map((el) => (
              <HeaderDrawerEach
                key={el._id}
                onClick={() => {
                  clickMyRestaurantHandler(el._id);
                }}
              >
                {el.name}
              </HeaderDrawerEach>
            ))
          ) : (
            <Spin />
          )}
          <HeaderDrawerEach onClick={goAddRestaurantPage}>
            식당 추가하기
            <Divider type="vertical" />
            <MdAddCircle />
          </HeaderDrawerEach>
        </>
      ) : (
        <>
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
        </>
      )}
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
