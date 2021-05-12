import React, { useCallback } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import styled from "styled-components";

const MenuSingle = ({ content, action }) => {
  return <MenuSingleStyled onClick={action}>{content}</MenuSingleStyled>;
};

const AuthorizedUserMenus = () => {
  const history = useHistory();
  const logoutHandler = () => {};

  return (
    <>
      <MenuSingle
        content="예약 내역"
        action={() => {
          history.push("/reservation");
        }}
      />
      <MenuSingle
        content="마이페이지"
        action={() => {
          history.push("/mypage");
        }}
      />
      <MenuSingle content="로그아웃" action={logoutHandler} />
    </>
  );
};

const UnauthorizedUserMenu = () => {
  const history = useHistory();
  return (
    <>
      <MenuSingle
        content="로그인"
        action={() => {
          history.push("/signin");
        }}
      />
      <MenuSingle
        content="회원가입"
        action={() => {
          history.push("/signup");
        }}
      />
    </>
  );
};

const UserMenu = () => {
  // const authorized = useSelector((state) => state.userTracker.authorized);
  const authorized = false;
  return <>{authorized ? <AuthorizedUserMenus /> : <UnauthorizedUserMenu />}</>;
};

const MenuSingleStyled = styled.div`
  padding: 7px 0;
  text-align: center;
`;

export default UserMenu;
