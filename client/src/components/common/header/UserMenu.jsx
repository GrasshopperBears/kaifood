import React, { useState, useCallback } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import SignupModal from "@components/common/auth/SignupModal";
import styled from "styled-components";

const MenuSingle = ({ content, action }) => {
  return <MenuSingleStyled onClick={action}>{content}</MenuSingleStyled>;
};

const AuthorizedUserMenus = () => {
  const history = useHistory();
  const goReservationPage = useCallback(() => {
    history.push("/reservation");
  }, [history]);
  const goMypage = useCallback(() => {
    history.push("/mypage");
  }, [history]);
  const logoutHandler = () => {};

  return (
    <>
      <MenuSingle content="예약 내역" action={goReservationPage} />
      <MenuSingle content="마이페이지" action={goMypage} />
      <MenuSingle content="로그아웃" action={logoutHandler} />
    </>
  );
};

const UnauthorizedUserMenu = ({ closeUserMenu }) => {
  const [signupVisible, setSignupVisible] = useState(false);
  const [signinVisible, setSigninVisible] = useState(false);

  const showSignupModal = useCallback(() => {
    closeUserMenu();
    setSignupVisible(true);
  }, []);
  const hideSignupModal = useCallback(() => {
    setSignupVisible(false);
  }, []);
  const showSigninModal = useCallback(() => {
    closeUserMenu();
    setSigninVisible(true);
  }, []);
  const hideSigninModal = useCallback(() => {
    setSigninVisible(false);
  }, []);

  return (
    <>
      <MenuSingle content="로그인" action={showSigninModal} />
      <MenuSingle content="회원가입" action={showSignupModal} />
      <SignupModal hideSignupModal={hideSignupModal} visible={signupVisible} />
    </>
  );
};

const UserMenu = ({ closeUserMenu }) => {
  // const authorized = useSelector((state) => state.userTracker.authorized);
  const authorized = false;
  return <>{authorized ? <AuthorizedUserMenus /> : <UnauthorizedUserMenu closeUserMenu={closeUserMenu} />}</>;
};

const MenuSingleStyled = styled.div`
  padding: 7px 0;
  text-align: center;
`;

export default UserMenu;
