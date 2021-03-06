import React, { useState, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import firebase from "app-firebase";
import { userLogout } from "@actions/user";
import { clearOwnerRestaurant } from "@actions/owner-restaurant";
import SigninModal from "@components/common/auth/SigninModal";
import SignupModal from "@components/common/auth/SignupModal";
import styled from "styled-components";

const MenuSingle = ({ content, action }) => {
  return <MenuSingleStyled onClick={action}>{content}</MenuSingleStyled>;
};

const AuthorizedUserMenus = ({ closeUserMenu }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { isOwner } = useSelector((state) => state.userTracker);

  const goReservationPage = useCallback(() => {
    closeUserMenu();
    history.push("/reservation");
  }, [history]);
  const goMypage = useCallback(() => {
    closeUserMenu();
    history.push("/mypage");
  }, [history]);
  const goOwnerPage = useCallback(() => {
    closeUserMenu();
    history.push("/owner");
  }, [history]);
  const logoutHandler = async () => {
    closeUserMenu();
    await firebase.auth().signOut();
    dispatch(userLogout());
    dispatch(clearOwnerRestaurant());
    history.push("/");
  };

  return (
    <>
      <MenuSingle content="예약 내역" action={goReservationPage} />
      {isOwner && <MenuSingle content="식당 관리하기" action={goOwnerPage} />}
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
      <SigninModal hideSigninModal={hideSigninModal} visible={signinVisible} />
    </>
  );
};

const UserMenu = ({ closeUserMenu }) => {
  const { authorized, initialized } = useSelector((state) => state.userTracker);

  return (
    <>
      {initialized &&
        (authorized ? <AuthorizedUserMenus closeUserMenu={closeUserMenu} /> : <UnauthorizedUserMenu closeUserMenu={closeUserMenu} />)}
    </>
  );
};

const MenuSingleStyled = styled.div`
  padding: 7px 0;
  text-align: center;
  :hover {
    cursor: pointer;
  }
`;

export default UserMenu;
