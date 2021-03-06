import React, { useState, useCallback, useEffect } from "react";
import { isBrowser } from "react-device-detect";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import UserMenu from "./UserMenu";
import HeaderDrawer from "./HeaderDrawer";
import { userCheckLogin, userLogin } from "@actions/user";
import { initOwnerRestaurant } from "@actions/owner-restaurant";
import signin from "@services/auth/signin";
import firebase from "app-firebase";
import styled from "styled-components";
import { Button, Popover } from "antd";
import { MenuOutlined, UserOutlined } from "@ant-design/icons";

const Header = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [menuVisible, setMenuVisible] = useState(false);
  const [userMenuVisible, setUserMenuVisible] = useState(false);
  const { initialized } = useSelector((state) => state.userTracker);

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged(async (user) => {
      if (!initialized) {
        if (!user) return dispatch(userCheckLogin());
        const result = await signin(user.uid);
        if (!result.success) return dispatch(userCheckLogin());
        dispatch(userLogin(result.isOwner));
        if (result.isOwner) dispatch(initOwnerRestaurant(result.restaurants));
      }
    });
    return unsubscribe;
  }, [initialized, dispatch]);

  const openMenu = useCallback(() => {
    setMenuVisible(true);
  }, []);
  const closeMenu = useCallback(() => {
    setMenuVisible(false);
  }, []);
  const goMainPage = useCallback(() => {
    history.push("/");
  }, [history]);
  const userMenuVisibleHandler = useCallback((visible) => {
    setUserMenuVisible(visible);
  }, []);
  const closeUserMenu = useCallback(() => {
    setUserMenuVisible(false);
  }, []);

  return (
    <>
      <HeaderStyled isBrowser={isBrowser}>
        <MenuButton onClick={openMenu} icon={<MenuOutlined />} />
        <Title onClick={goMainPage}>밥상</Title>
        <Popover
          visible={userMenuVisible}
          onVisibleChange={userMenuVisibleHandler}
          placement="bottomRight"
          content={<UserMenu closeUserMenu={closeUserMenu} />}
          trigger="click"
        >
          <UserBtn icon={<UserOutlined />} shape="circle" />
        </Popover>
      </HeaderStyled>
      <HeaderDrawer closeMenu={closeMenu} visible={menuVisible} />
    </>
  );
};

const MenuButton = styled(Button)`
  border-width: 2px;
  border-color: ${(props) => props.theme.color.borderGray};
`;

const Title = styled.p`
  padding: 5px 20px;
  font-weight: bolder;
  font-size: 1.1rem;
  :hover {
    cursor: pointer;
  }
`;

const UserBtn = styled(Button)`
  border-width: 2px;
  border-color: ${(props) => props.theme.color.borderGray};
`;

const HeaderStyled = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 13px ${(props) => (props.isBrowser ? props.theme.padding.browserSidePadding : props.theme.padding.mobileSidePadding)};
  border-bottom: 1px solid ${(props) => props.theme.color.borderGray};
`;

export default Header;
